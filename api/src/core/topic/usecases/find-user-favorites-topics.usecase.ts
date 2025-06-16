import { Injectable, NotFoundException } from "@nestjs/common";
import { TopicRepository } from "../topic.repository";
import { UserService } from "src/core/user/user.service";

@Injectable()
export class FindUserFavoritesTopicsUseCase {

    constructor(
        private readonly topicRepository: TopicRepository,
        private readonly userService: UserService
    ) { }

    public async execute(userId: string) {
        const user = await this.userService.findById(userId);

        if (!user) {
            throw new NotFoundException('Usuário não encontrado.');
        }

        const topics = await this.topicRepository.findUserFavoriteTopics(user.username);
        return topics;
    }

}