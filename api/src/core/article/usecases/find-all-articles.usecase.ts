import { Injectable } from "@nestjs/common";
import { ArticleRepository } from "../article.repository";
import type { PaginationQuery } from "src/shared/dtos/pagination-query.dto";

@Injectable()
export class FindAllArticlesUseCase {

    constructor(
        private readonly articleRepository: ArticleRepository
    ) { }

    public async execute({ page = 1, limit = 10 }: PaginationQuery) {
        const paginatedArticles = await this.articleRepository.findAll({
            page,
            limit
        });

        return paginatedArticles;
    }

}