import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { TopicRepository } from "../topic.repository";
import type { RemoveTopicFromFavoritesDTO } from "../dtos/add-topic-to-favorites.dto copy";

@Injectable()
export class RemoveTopicFromFavoritesUseCase {

    constructor(
        private readonly topicRepository: TopicRepository
    ) { }

    public async execute(data: RemoveTopicFromFavoritesDTO) {
        const [topicExists, favoriteTopic] = await Promise.all([
            this.topicRepository.findById(data.topicId),
            this.topicRepository.findUserFavoriteTopic({
                userId: data.userId,
                topicId: data.topicId
            })
        ]);

        if (!topicExists) {
            throw new NotFoundException('Tópico não encontrado');
        }

        if (!favoriteTopic) {
            throw new BadRequestException('Você não favoritou esse tópico');
        }

        await this.topicRepository.deleteFavoriteTopic({
            userId: data.userId,
            topicId: data.topicId
        });
    }

}