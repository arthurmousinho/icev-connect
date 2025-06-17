import { Injectable } from "@nestjs/common";
import { ArticleRepository } from "../article.repository";
import type { PaginationQuery } from "src/shared/dtos/pagination-query.dto";
import type { SearchArticlesDTO } from "../dtos/search-articles.dto";

@Injectable()
export class SearchArticlesUseCase {

    constructor(
        private readonly articlesRepository: ArticleRepository,
    ) { }

    public async execute(data: SearchArticlesDTO & PaginationQuery) {
        const { query, topicSlugs, orderBy, page = 1, limit = 10 } = data;

        return await this.articlesRepository.searchArticles(
            { query, topicSlugs, orderBy },
            { page, limit }
        );
    }

}