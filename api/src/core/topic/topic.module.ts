import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/infra/database/database.module";
import { TopicController } from "./topic.controller";
import { TopicRepository } from "./topic.repository";
import { AddTopicToFavoritesUseCase } from "./usecases/add-topic-to-favorites.usecase";
import { RemoveTopicFromFavoritesUseCase } from "./usecases/remove-topic-from-favorites.usecase";
import { CreateTopicUseCase } from "./usecases/create-topic.usecase";
import { FindAllTopicsUseCase } from "./usecases/find-all-topics.usecase";
import { FindTopicBySlugUseCase } from "./usecases/find-topic-by-slug.usecase";
import { GetTopicRankingUseCase } from "./usecases/get-topic-ranking.usecase";
import { FindTopicByIdUseCase } from "./usecases/find-topic-by-id.usecase";

@Module({
    imports: [
        DatabaseModule
    ],
    controllers: [
        TopicController
    ],
    providers: [
        TopicRepository,

        AddTopicToFavoritesUseCase,
        RemoveTopicFromFavoritesUseCase,
        CreateTopicUseCase,
        FindAllTopicsUseCase,
        FindTopicBySlugUseCase,
        FindTopicByIdUseCase,
        GetTopicRankingUseCase
    ],
    exports: [
        FindTopicByIdUseCase,
        FindTopicBySlugUseCase
    ]
})
export class TopicModule { }