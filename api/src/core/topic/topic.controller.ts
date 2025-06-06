import { Body, Controller, Delete, HttpCode, NotFoundException, Param, Post, UseGuards } from "@nestjs/common";
import { TopicService } from "./topic.service";
import { CreateTopicDTO } from "./dtos/create-topic.dto";
import { AuthGuard } from "@nestjs/passport";

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

    @Post(':slug')
    public async findBySlug(@Param('slug') slug: string) {
        const data = await this.topicService.findBySlug(slug);
        return { data };
    }

    @Delete(':id')
    @HttpCode(204)
    public async deleteById(@Param('id') id: string) {
        await this.topicService.deleteById(id);
    }

}