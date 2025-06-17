import { Injectable } from "@nestjs/common";
import { TopicRepository } from "../topic.repository";
import { FindUserByIdUseCase } from "src/core/user/usecases/find-user-by-id.usecase";

@Injectable()
export class FindUserFavoritesTopicsUseCase {

    constructor(
        private readonly topicRepository: TopicRepository,
        private readonly findUserByIdUseCase: FindUserByIdUseCase
    ) { }

    public async execute(userId: string) {
        const user = await this.findUserByIdUseCase.execute(userId);
        const topics = await this.topicRepository.findUserFavoriteTopics(user.username);
        return topics;
    }

}