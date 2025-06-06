import { Body, Controller, Get, NotFoundException, Param, Post, Req, UseGuards } from "@nestjs/common";
import { ArticleService } from "./article.service";
import { CreateArticleDTO } from "./dtos/create-article.dto";
import { AuthGuard } from "@nestjs/passport";

@UseGuards(AuthGuard('jwt'))
@Controller('articles')
export class ArticlesController {

    constructor(
        private readonly articleService: ArticleService
    ) { }

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

    @Get(':slug')
    public async findAll(@Param(':slug') slug: string) {
        const data = await this.articleService.findBySlug(slug);
        return { data };
    }

}