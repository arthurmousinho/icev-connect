import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { ArticleRepository } from "../article.repository";
import { PrismaService } from "src/infra/database/prisma.service";
import type { UnlikeArticleDTO } from "../dtos/unlike-article.dto";

@Injectable()
export class UnlikeArticleUseCase {

    constructor(
        private readonly articleRepository: ArticleRepository,
        private readonly prismaService: PrismaService
    ) { }

    public async execute(data: UnlikeArticleDTO) {
        const [articleExists, hasLiked] = await Promise.all([
            this.articleRepository.findById(data.articleId),
            this.articleRepository.findUserLikeForArticle(data)
        ]);

        if (!articleExists) {
            throw new NotFoundException('Artigo não encontrado.');
        }

        if (!hasLiked) {
            throw new BadRequestException('Você não curtiu esse artigo.');
        }

        await Promise.all([
            this.articleRepository.deleteLike({
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
                        decrement: 1
                    }
                }
            })
        ]);

    }

}