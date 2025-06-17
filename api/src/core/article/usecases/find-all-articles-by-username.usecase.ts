import { Injectable } from "@nestjs/common";
import { ArticleRepository } from "../article.repository";
import { FindUserByUsernameUseCase } from "src/core/user/usecases/find-user-by-username.usecase";
import type { PaginationQuery } from "src/shared/dtos/pagination-query.dto";

type FindAllArticlesByUsernameInput = {
    username: string;
    pagination: PaginationQuery
}

@Injectable()
export class FindAllArticlesByUsernameUseCase {

    constructor(
        private readonly articleRepository: ArticleRepository,
        private readonly findUserByUsernameUseCase: FindUserByUsernameUseCase
    ) { }

    public async execute({
        username,
        pagination: { page = 1, limit = 10 }
    }: FindAllArticlesByUsernameInput) {
        await this.findUserByUsernameUseCase.execute(username);

        const paginatedArticles = await this.articleRepository.findAllByUsername(
            username,
            { page, limit }
        );

        return paginatedArticles;

    }

}