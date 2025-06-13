import { Body, Controller, Delete, Get, HttpCode, Param, Post, Req, UseGuards } from "@nestjs/common";
import { TopicService } from "./topic.service";
import { CreateTopicDTO } from "./dtos/create-topic.dto";
import { AuthGuard } from "@nestjs/passport";
import type { AddTopicToFavoritesDTO } from "./dtos/remove-topic-from-favorites.dto";

@UseGuards(AuthGuard('jwt'))
@Controller('topics')
export class TopicController {

    constructor(
        private readonly topicService: TopicService
    ) { }

    @Post()
    @HttpCode(201)
    public async create(@Body() body: CreateTopicDTO) {
        const data = await this.topicService.create({
            title: body.title,
            icon: body.icon
        });
        return { data };
    }

    @Post('all')
    @HttpCode(200)
    public async findAll() {
        const data = await this.topicService.findAll();
        return { data };
    }

    @Get(':slug')
    public async findBySlug(
        @Param('slug') slug: string,
        @Req() req: any
    ) {
        const [topicData, topicRanking] = await Promise.all([
            this.topicService.findBySlug({
                userId: req.user.id,
                slug,
            }),
            this.topicService.getTopicRanking(slug)
        ]);
        return { data: { ...topicData, ranking: topicRanking } };
    }

    @Post('favorite/:id')
    @HttpCode(204)
    public async addToFavorites(
        @Param('id') id: string,
        @Req() req: any
    ) {
        await this.topicService.addToFavorites({
            topicId: id,
            userId: req.user.id,
        });
    }

    @Delete('favorite/:id')
    @HttpCode(204)
    public async removeFromFavorites(
        @Param('id') id: string,
        @Req() req: any
    ) {
        await this.topicService.removeFromFavorites({
            topicId: id,
            userId: req.user.id,
        });
    }

}