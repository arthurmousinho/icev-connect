import { Injectable, NotFoundException } from "@nestjs/common";
import { TopicRepository } from "../topic.repository";
import { PrismaService } from "src/infra/database/prisma.service";

type GetTopicRankingOutput = {
    position: number;
    user: {
        name: any;
        username: any;
        avatarUrl: any;
    };
    likesCount: number;
}[]

@Injectable()
export class GetTopicRankingUseCase {

    constructor(
        private readonly topicRepository: TopicRepository,
        private readonly prismaService: PrismaService
    ) { }

    public async execute(slug: string): Promise<GetTopicRankingOutput> {
        const topic = await this.topicRepository.findBySlug(slug);

        if (!topic) {
            throw new NotFoundException('Tópico não encontrado.');
        }

        // TODO: Use Article Repository to access  ORM/database to make this query
        const rankingRaw = await this.prismaService.articleLike.groupBy({
            by: ['articleId'],
            where: {
                article: {
                    topic: {
                        slug
                    },
                },
            },
            _count: {
                articleId: true,
            },
        });


        const likesByArticle: Record<string, number> = {};
        for (const entry of rankingRaw) {
            likesByArticle[entry.articleId] = entry._count.articleId;
        }

        // TODO: Use Article Repository to access  ORM/database to make this query
        const articles = await this.prismaService.article.findMany({
            where: {
                id: { in: Object.keys(likesByArticle) },
            },
            select: {
                id: true,
                author: {
                    select: {
                        id: true,
                        name: true,
                        username: true,
                        avatarUrl: true,
                    },
                },
            },
        });

        const authorMap = new Map<string, { user: any; likesCount: number }>();

        for (const article of articles) {
            const articleLikes = likesByArticle[article.id] ?? 0;
            const authorId = article.author.id;

            if (!authorMap.has(authorId)) {
                authorMap.set(authorId, {
                    user: article.author,
                    likesCount: 0,
                });
            }

            authorMap.get(authorId)!.likesCount += articleLikes;
        }

        const ranking = Array.from(authorMap.values())
            .filter((entry) => entry.likesCount > 0)
            .sort((a, b) => b.likesCount - a.likesCount)
            .slice(0, 5)
            .map((entry, index) => ({
                position: index + 1,
                user: {
                    name: entry.user.name,
                    username: entry.user.username,
                    avatarUrl: entry.user.avatarUrl,
                },
                likesCount: entry.likesCount,
            }));

        return ranking;
    }

}