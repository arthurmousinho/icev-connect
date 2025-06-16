import { Injectable, NotFoundException } from "@nestjs/common";
import { TopicRepository } from "../topic.repository";

type FindTopicBySlugInput = {
    slug: string;
    userId?: string;
}

@Injectable()
export class FindTopicBySlugUseCase {

    constructor(
        private readonly topicRepository: TopicRepository
    ) { }

    public async execute(data: FindTopicBySlugInput) {
        const topic = await this.topicRepository.findBySlug(data.slug);

        if (!topic) {
            throw new NotFoundException('Tópico não encontrado.')
        }

        let hasFavorite = false;

        if (data.userId) {
            const like = await this.topicRepository.findUserFavoriteTopic({
                userId: data.userId,
                topicId: topic.id
            });
            hasFavorite = !!like;
        }

        return {
            ...topic,
            hasFavorite
        };
    }

}