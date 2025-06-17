import { Injectable, NotFoundException } from "@nestjs/common";
import { ArticleRepository } from "../article.repository";
import { FindTopicBySlugUseCase } from "src/core/topic/usecases/find-topic-by-slug.usecase";
import type { PaginationQuery } from "src/shared/dtos/pagination-query.dto";

type FindAllArticlesByTopicSlugInput = {
    slug: string;
    pagination: PaginationQuery
}

@Injectable()
export class FindAllArticlesByTopicSlugUseCase {

    constructor(
        private readonly articleRepository: ArticleRepository,
        private readonly findTopicBySlugUseCase: FindTopicBySlugUseCase
    ) { }

    public async execute({ slug, pagination: { page = 1, limit = 10 } }: FindAllArticlesByTopicSlugInput) {
        const topic = await this.findTopicBySlugUseCase.execute({ slug });

        if (!topic) {
            throw new NotFoundException("Tópico não encontrado.");
        }

        const paginatedArticles = await this.articleRepository.findAllByTopicSlug(
            slug,
            { page, limit }
        );
        
        return paginatedArticles;
    }

}