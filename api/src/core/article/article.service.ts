import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infra/database/prisma.service";

@Injectable()
export class ArticleService {

    constructor(
        private readonly prismaService: PrismaService
    ) { }

}