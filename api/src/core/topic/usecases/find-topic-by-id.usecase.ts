import { Injectable, NotFoundException } from "@nestjs/common";
import { TopicRepository } from "../topic.repository";

@Injectable()
export class FindTopicByIdUseCase {

    constructor(
        private readonly topicRepository: TopicRepository
    ) { }

    public async execute(id: string) {
        const topic = await this.topicRepository.findById(id);

        if (!topic) {
            throw new NotFoundException('Tópico não encontrado.')
        }

        return topic;
    }

}