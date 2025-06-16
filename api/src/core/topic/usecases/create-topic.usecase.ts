import { ConflictException, Injectable } from "@nestjs/common";
import { generateSlug } from "src/shared/utils/generate-slug.util";
import { TopicRepository } from "../topic.repository";
import type { CreateTopicDTO } from "../dtos/create-topic.dto";

@Injectable()
export class CreateTopicUseCase {

    constructor(
        private readonly topicRepository: TopicRepository
    ) { }

    public async execute(data: CreateTopicDTO) {
        const topicSlug = generateSlug(data.title)

        const topicWithSlug = await this.topicRepository.findBySlug(topicSlug);

        if (topicWithSlug) {
            throw new ConflictException('Já existe um tópico com esse slug, tente mudar o título do tópico.')
        }

        const topicCreated = await this.topicRepository.create({
            title: data.title,
            slug: topicSlug,
            icon: data.icon
        });

        return topicCreated;
    }

}