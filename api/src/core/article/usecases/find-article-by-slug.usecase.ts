import { Injectable, NotFoundException } from "@nestjs/common";
import { ArticleRepository } from "../article.repository";

type FindArticleBySlugInput = {
    slug: string;
    userId: string;
}

@Injectable()
export class FindArticleBySlugUseCase {

    constructor(
        private readonly articleRepository: ArticleRepository
    ) { }

    public async execute(data: FindArticleBySlugInput) {
        const articleWithSlug = await this.articleRepository.findBySlug(data.slug);

        if (!articleWithSlug) {
            throw new NotFoundException("Artigo não encontrado.");
        }

        const hasLiked = Boolean(await this.articleRepository.findUserLikeForArticle({
            userId: data.userId,
            articleId: articleWithSlug.id
        }));

        return {
            ...articleWithSlug,
            hasLiked
        };
    }

}