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

    @Post('all')
    public async findAll() {
        const data = await this.articleService.findAll();
        return { data };
    }

    @Post('topic/:topicSlug')
    public async findAllByTopic(@Param('topicSlug') topicSlug: string) {
        const data = await this.articleService.findAllByTopicSlug(topicSlug);
        return { data };
    }

    @Get(':slug')
    public async findBySlug(@Param(':slug') slug: string) {
        const data = await this.articleService.findBySlug(slug);
        return { data };
    }

}