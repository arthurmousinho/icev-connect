import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/infra/database/prisma.service";
import { generateSlug } from "src/shared/utils/generate-slug.util";
import type { CreateTopicDTO } from "./dtos/create-topic.dto";
import type { FindMethodOptions } from "src/shared/types/find-method-options.type";
import type { AddTopicToFavoritesDTO } from "./dtos/remove-topic-from-favorites.dto";
import type { RemoveTopicFromFavoritesDTO } from "./dtos/add-topic-to-favorites.dto copy";

@Injectable()
export class TopicService {

    constructor(
        private readonly prismaService: PrismaService
    ) { }

    public async create(data: CreateTopicDTO) {
        const topicSlug = generateSlug(data.title)

        const topicWithSlug = await this.findBySlug(
            { slug: topicSlug },
            { throwError: false }
        );

        if (topicWithSlug) {
            throw new ConflictException('Já existe um tópico com esse slug, tente mudar o título do tópico.')
        }

        const topicCreated = await this.prismaService.topic.create({
            data: {
                title: data.title,
                slug: topicSlug,
                icon: data.icon
            }
        });

        return topicCreated;
    }

    public async findAll() {
        const topics = await this.prismaService.topic.findMany({
            include: {
                _count: {
                    select: {
                        articles: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return topics.map(topic => ({
            ...topic,
            articlesCount: topic._count.articles,
            _count: undefined
        }));
    }

    public async getTopicRanking(topicSlug: string) {
        await this.findBySlug({ slug: topicSlug });

        const rankingRaw = await this.prismaService.articleLike.groupBy({
            by: ['articleId'],
            where: {
                article: {
                    topic: {
                        slug: topicSlug
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

    public async findBySlug(
        data: { slug: string, userId?: string },
        options: FindMethodOptions = { throwError: true }
    ) {
        const topic = await this.prismaService.topic.findUnique({
            where: { slug: data.slug }
        });

        if (!topic && options?.throwError) {
            throw new NotFoundException('Tópico não encontrado.')
        }

        let hasFavorite = false;

        if (data.userId && topic) {
            const like = await this.findUserFavoriteTopic(
                { userId: data.userId, topicId: topic.id },
                { throwError: false }
            );
            hasFavorite = !!like;
        }

        return {
            ...topic,
            hasFavorite
        };
    }

    public async findById(
        id: string,
        options: FindMethodOptions = { throwError: true }
    ) {
        const topic = await this.prismaService.topic.findUnique({
            where: {
                id
            }
        });

        if (!topic && options?.throwError) {
            throw new NotFoundException('Tópico não encontrado.')
        }

        return topic;
    }

    public async findUserFavoriteTopic(
        data: { userId: string, topicId: string },
        options: FindMethodOptions = { throwError: true }
    ) {
        const favoriteTopicByUser = await this.prismaService.favoriteTopic.findUnique({
            where: {
                userId_topicId: {
                    userId: data.userId,
                    topicId: data.topicId
                }
            }
        });

        if (!favoriteTopicByUser && options.throwError) {
            throw new BadRequestException('Você não favoritou esse tópico');
        }

        return favoriteTopicByUser;
    }

    public async addToFavorites(data: AddTopicToFavoritesDTO) {
        const [topicExists, alreadyFavorite] = await Promise.all([
            this.findById(data.topicId),
            this.findUserFavoriteTopic(
                { userId: data.userId, topicId: data.topicId },
                { throwError: false }
            )
        ]);

        if (alreadyFavorite) {
            throw new ConflictException('Você já favoritou esse tópico');
        }

        await this.prismaService.favoriteTopic.create({
            data: {
                userId: data.userId,
                topicId: data.topicId
            }
        });
    }

    public async removeFromFavorites(data: RemoveTopicFromFavoritesDTO) {
        await Promise.all([
            this.findById(data.topicId),
            this.findUserFavoriteTopic({
                userId: data.userId,
                topicId: data.topicId
            })
        ]);

        await this.prismaService.favoriteTopic.delete({
            where: {
                userId_topicId: {
                    userId: data.userId,
                    topicId: data.topicId
                }
            }
        });
    }

    public async findUserFavoriteTopics(username: string) {
        const favoriteTopicsByUser = await this.prismaService.favoriteTopic.findMany({
            where: {
                user: {
                    username
                }
            },
            select: {
                topic: {
                    select: {
                        title: true,
                        icon: true,
                        slug: true,
                    }
                }
            }
        });

        return favoriteTopicsByUser.map(item => item.topic);
    }

}