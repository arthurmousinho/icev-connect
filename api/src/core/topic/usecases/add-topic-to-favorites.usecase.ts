import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { TopicRepository } from "../topic.repository";
import type { AddTopicToFavoritesDTO } from "../dtos/remove-topic-from-favorites.dto";

@Injectable()
export class AddTopicToFavoritesUseCase {

    constructor(
        private readonly topicRepository: TopicRepository
    ) { }

    public async execute(data: AddTopicToFavoritesDTO) {
        const [topicExists, alreadyFavorite] = await Promise.all([
            this.topicRepository.findById(data.topicId),
            this.topicRepository.findUserFavoriteTopic({
                userId: data.userId,
                topicId: data.topicId
            })
        ]);

        if (!topicExists) {
            throw new NotFoundException('Tópico não encontrado');
        }

        if (alreadyFavorite) {
            throw new ConflictException('Você já favoritou esse tópico');
        }

        await this.topicRepository.createFavoriteTopic({
            userId: data.userId,
            topicId: data.topicId
        });
    }

}