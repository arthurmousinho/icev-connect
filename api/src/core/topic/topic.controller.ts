import { Body, Controller, Delete, Get, HttpCode, Param, Post, Req, UseGuards } from "@nestjs/common";
import { CreateTopicDTO } from "./dtos/create-topic.dto";
import { AuthGuard } from "@nestjs/passport";
import { CreateTopicUseCase } from "./usecases/create-topic.usecase";
import { FindAllTopicsUseCase } from "./usecases/find-all-topics.usecase";
import { FindTopicBySlugUseCase } from "./usecases/find-topic-by-slug.usecase";
import { GetTopicRankingUseCase } from "./usecases/get-topic-ranking.usecase";
import { AddTopicToFavoritesUseCase } from "./usecases/add-topic-to-favorites.usecase";
import { RemoveTopicFromFavoritesUseCase } from "./usecases/remove-topic-from-favorites.usecase";

@UseGuards(AuthGuard('jwt'))
@Controller('topics')
export class TopicController {

    constructor(
        private readonly createTopicUseCase: CreateTopicUseCase,
        private readonly findAllTopicsUseCase: FindAllTopicsUseCase,
        private readonly findTopicBySlugUseCase: FindTopicBySlugUseCase,
        private readonly getTopicRankingUseCase: GetTopicRankingUseCase,
        private readonly addTopicToFavoritesUseCase: AddTopicToFavoritesUseCase,
        private readonly removeTopicFromFavoritesUseCase: RemoveTopicFromFavoritesUseCase
    ) { }

    @Post()
    @HttpCode(201)
    public async create(@Body() body: CreateTopicDTO) {
        const data = await this.createTopicUseCase.execute({
            title: body.title,
            icon: body.icon
        });
        return { data };
    }

    @Post('all')
    @HttpCode(200)
    public async findAll() {
        const data = await this.findAllTopicsUseCase.execute();
        return { data };
    }

    @Get(':slug')
    public async findBySlug(
        @Param('slug') slug: string,
        @Req() req: any
    ) {
        const [topicData, topicRanking] = await Promise.all([
            this.findTopicBySlugUseCase.execute({
                userId: req.user.id,
                slug,
            }),
            this.getTopicRankingUseCase.execute(slug)
        ]);
        return { data: { ...topicData, ranking: topicRanking } };
    }

    @Post('favorite/:id')
    @HttpCode(204)
    public async addToFavorites(
        @Param('id') id: string,
        @Req() req: any
    ) {
        await this.addTopicToFavoritesUseCase.execute({
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
        await this.removeTopicFromFavoritesUseCase.execute({
            topicId: id,
            userId: req.user.id,
        });
    }

}