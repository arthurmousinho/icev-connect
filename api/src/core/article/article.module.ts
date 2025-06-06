import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/infra/database/database.module";
import { ArticlesController } from "./article.controller";
import { ArticleService } from "./article.service";
import { TopicModule } from "../topic/topic.module";

@Module({
    imports: [
        DatabaseModule,
        TopicModule
    ],
    providers: [
        ArticleService
    ],
    controllers: [
        ArticlesController
    ],
    exports: [

    ]
})
export class ArticleModule { }