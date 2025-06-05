import { Body, Controller, Post, UseGuards } from "@nestjs/common";
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
    public async create(@Body() body: CreateTopicDTO) {
        const data = await this.topicService.create({
            title: body.title
        });

        return { data };
    }

    @Post('all')
    public async findAll() {
        const data = await this.topicService.findAll();

        return { data };
    }

}