import { Body, Controller, Delete, Get, HttpCode, Param, Post, Query, Req, UseGuards } from "@nestjs/common";
import { CreateArticleDTO } from "./dtos/create-article.dto";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "../auth/guards/role.guard";
import { Roles } from "../auth/decorators/roles.decorator";
import { SearchArticlesDTO } from "./dtos/search-articles.dto";

import { CreateArticleUseCase } from "./usecases/create-article.usecase";
import { FindAllArticlesByTopicSlugUseCase } from "./usecases/find-all-articles-by-topic-slug.usecase";
import { FindAllArticlesByUsernameUseCase } from "./usecases/find-all-articles-by-username.usecase";
import { FindAllArticlesUseCase } from "./usecases/find-all-articles.usecase";
import { FindArticleBySlugUseCase } from "./usecases/find-article-by-slug.usecase";
import { LikeArticleUseCase } from "./usecases/like-article.usecase";
import { UnlikeArticleUseCase } from "./usecases/unlike-article.usecase";
import { SearchArticlesUseCase } from "./usecases/search-articles.usecase";

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('articles')
export class ArticlesController {

    constructor(
        private readonly createArticleUseCase: CreateArticleUseCase,
        private readonly findAllArticlesByTopicSlugUseCase: FindAllArticlesByTopicSlugUseCase,
        private readonly findAllArticlesByUsernameUseCase: FindAllArticlesByUsernameUseCase,
        private readonly findAllArticlesUseCase: FindAllArticlesUseCase,
        private readonly findArticleBySlugUseCase: FindArticleBySlugUseCase,
        private readonly likeArticleUseCase: LikeArticleUseCase,
        private readonly unlikeArticleUseCase: UnlikeArticleUseCase,
        private readonly searchArticlesUseCase: SearchArticlesUseCase
    ) { }

    @Get(':slug')
    public async findBySlug(@Param('slug') slug: string, @Req() req: any) {
        const data = await this.findArticleBySlugUseCase.execute({
            slug,
            userId: req.user.id
        });
        return { data };
    }

    @Post()
    public async create(@Body() body: CreateArticleDTO, @Req() req: any) {
        const data = await this.createArticleUseCase.execute({
            title: body.title,
            description: body.description,
            topicId: body.topicId,
            content: body.content,
            authorId: req.user.id
        });

        return { data };
    }

    @Post('all')
    @HttpCode(200)
    @Roles('ADMIN')
    public async findAll(
        @Query('page') page = '1',
        @Query('limit') limit = '10',
    ) {
        return await this.findAllArticlesUseCase.execute({
            page: parseInt(page, 10),
            limit: parseInt(limit, 10),
        });
    }

    @HttpCode(200)
    @Post('topic/:topicSlug')
    public async findAllByTopic(
        @Param('topicSlug') topicSlug: string,
        @Query('page') page = '1',
        @Query('limit') limit = '10',
    ) {
        return await this.findAllArticlesByTopicSlugUseCase.execute({
            slug: topicSlug,
            pagination: {
                page: parseInt(page, 10),
                limit: parseInt(limit, 10),
            }
        });
    }

    @HttpCode(200)
    @Post('user/:username')
    public async findAllByUsername(
        @Param('username') username: string,
        @Query('page') page = '1',
        @Query('limit') limit = '10',
    ) {
        return await this.findAllArticlesByUsernameUseCase.execute({
            username,
            pagination: {
                page: parseInt(page, 10),
                limit: parseInt(limit, 10),
            }
        });
    }

    @Post('like/:id')
    @HttpCode(204)
    public async like(@Param('id') id: string, @Req() req: any) {
        return await this.likeArticleUseCase.execute({
            userId: req.user.id,
            articleId: id
        });
    }

    @Delete('like/:id')
    @HttpCode(204)
    public async unlike(@Param('id') id: string, @Req() req: any) {
        return await this.unlikeArticleUseCase.execute({
            userId: req.user.id,
            articleId: id
        });
    }

    @Post('search')
    @HttpCode(200)
    public async search(
        @Body() body: SearchArticlesDTO,
        @Query('page') page = '1',
        @Query('limit') limit = '10',
    ) {
        return await this.searchArticlesUseCase.execute({
            ...body,
            page: parseInt(page, 10),
            limit: parseInt(limit, 10),
        });
    }

}