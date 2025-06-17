import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/infra/database/database.module";
import { ArticlesController } from "./article.controller";
import { TopicModule } from "../topic/topic.module";
import { UserModule } from "../user/user.module";
import { ArticleRepository } from "./article.repository";
import { CreateArticleUseCase } from "./usecases/create-article.usecase";
import { FindAllArticlesByTopicSlugUseCase } from "./usecases/find-all-articles-by-topic-slug.usecase";
import { FindAllArticlesByUsernameUseCase } from "./usecases/find-all-articles-by-username.usecase";
import { FindAllArticlesUseCase } from "./usecases/find-all-articles.usecase";
import { FindArticleBySlugUseCase } from "./usecases/find-article-by-slug.usecase";
import { LikeArticleUseCase } from "./usecases/like-article.usecase";
import { UnlikeArticleUseCase } from "./usecases/unlike-article.usecase";
import { SearchArticlesUseCase } from "./usecases/search-articles.usecase";

@Module({
    imports: [
        DatabaseModule,
        TopicModule,
        UserModule
    ],
    providers: [
        ArticleRepository,

        CreateArticleUseCase,
        FindAllArticlesByTopicSlugUseCase,
        FindAllArticlesByUsernameUseCase,
        FindAllArticlesUseCase,
        FindArticleBySlugUseCase,
        LikeArticleUseCase,
        UnlikeArticleUseCase,
        SearchArticlesUseCase
    ],
    controllers: [
        ArticlesController
    ],
    exports: [

    ]
})
export class ArticleModule { }