import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/infra/database/database.module";
import { ArticlesController } from "./article.controller";
import { ArticleService } from "./article.service";

@Module({
    imports: [
        DatabaseModule
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