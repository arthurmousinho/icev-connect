import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { ArticleRepository } from "../article.repository";
import { PrismaService } from "src/infra/database/prisma.service";
import type { LikeArticleDTO } from "../dtos/like-article.dto";

@Injectable()
export class LikeArticleUseCase {

    constructor(
        private readonly articleRepository: ArticleRepository,
        private readonly prismaService: PrismaService
    ) { }

    public async execute(data: LikeArticleDTO) {
        const [articleExists, hasLiked] = await Promise.all([
            this.articleRepository.findById(data.articleId),
            this.articleRepository.findUserLikeForArticle(data)
        ]);

        if (!articleExists) {
            throw new NotFoundException('Artigo não encontrado.');
        }

        if (hasLiked) {
            throw new ConflictException('Você já curtiu esse artigo.');
        }

        await Promise.all([
            this.articleRepository.createLike({
                userId: data.userId,
                articleId: data.articleId
            }),

            // TODO: Create a repository method to handle to article updates
            this.prismaService.article.update({
                where: {
                    id: data.articleId
                },
                data: {
                    likesCount: {
                        increment: 1
                    }
                }
            })
        ]);
    }

}