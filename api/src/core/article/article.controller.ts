import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { ArticleService } from "./article.service";
import { CreateArticleDTO } from "./dtos/create-article.dto";
import { AuthGuard } from "@nestjs/passport";

@Controller('articles')
export class ArticlesController {

    constructor(
        private readonly articleService: ArticleService
    ) { }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    public async create(@Body() body: CreateArticleDTO, @Req() req: any) {
        const data = await this.articleService.create({
            title: body.title,
            description: body.description,
            topicsId: body.topicsId,
            content: body.content,
            authorId: req.user.id
        });

        return { data };
    }

}