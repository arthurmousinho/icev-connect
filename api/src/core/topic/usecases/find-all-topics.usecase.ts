import { Injectable } from "@nestjs/common";
import { TopicRepository } from "../topic.repository";

@Injectable()
export class FindAllTopicsUseCase {

    constructor(
        private readonly topicRepository: TopicRepository
    ) { }

    public async execute() {
        const topics = await this.topicRepository.findAll();
        return topics;
    }

}