import { Injectable } from "@nestjs/common";
import { ArticleRepository } from "../article.repository";
import { UserService } from "src/core/user/user.service";
import type { PaginationQuery } from "src/shared/dtos/pagination-query.dto";

type FindAllArticlesByUsernameInput = {
    username: string;
    pagination: PaginationQuery
}

@Injectable()
export class FindAllArticlesByUsernameUseCase {

    constructor(
        private readonly articleRepository: ArticleRepository,
        private readonly userService: UserService
    ) { }

    public async execute({
        username,
        pagination: { page = 1, limit = 10 }
    }: FindAllArticlesByUsernameInput) {

        await this.userService.findByUsername(username);

        const paginatedArticles = await this.articleRepository.findAllByUsername(
            username,
            { page, limit }
        );

        return paginatedArticles;

    }

}