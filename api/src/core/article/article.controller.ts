import { Body, Controller, Delete, Get, HttpCode, Param, Post, Req, UseGuards } from "@nestjs/common";
import { ArticleService } from "./article.service";
import { CreateArticleDTO } from "./dtos/create-article.dto";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "../auth/guards/role.guard";
import { Roles } from "../auth/decorators/roles.decorator";

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('articles')
export class ArticlesController {

    constructor(
        private readonly articleService: ArticleService
    ) { }

    @Get(':slug')
    public async findBySlug(@Param('slug') slug: string, @Req() req: any) {
        const data = await this.articleService.findBySlug({
            slug,
            userId: req.user.id
        });
        return { data };
    }

    @Post()
    public async create(@Body() body: CreateArticleDTO, @Req() req: any) {
        const data = await this.articleService.create({
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
    public async findAll() {
        const data = await this.articleService.findAll();
        return { data };
    }

    @HttpCode(200)
    @Post('topic/:topicSlug')
    public async findAllByTopic(@Param('topicSlug') topicSlug: string) {
        const data = await this.articleService.findAllByTopicSlug(topicSlug);
        return { data };
    }

    @HttpCode(200)
    @Post('user/:username')
    public async findAllByUsername(@Param('username') username: string) {
        const data = await this.articleService.findAllByUsername(username);
        return { data };
    }

    @Post('like/:id')
    public async like(@Param('id') id: string, @Req() req: any) {
        return await this.articleService.addLike({
            userId: req.user.id,
            articleId: id
        });
    }

    @Delete('like/:id')
    public async unlike(@Param('id') id: string, @Req() req: any) {
        return await this.articleService.removeLike({
            userId: req.user.id,
            articleId: id
        });
    }

}