import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/infra/database/prisma.service";
import { generateSlug } from "src/shared/utils/generate-slug.util";
import { sanitizeMarkown } from "src/shared/utils/mardown-sanitizer.util";
import { TopicService } from "../topic/topic.service";
import type { CreateArticleDTO } from "./dtos/create-article.dto";

@Injectable()
export class ArticleService {

    constructor(
        private readonly prismaService: PrismaService,
        private readonly topicService: TopicService
    ) { }

    public async create(data: CreateArticleDTO) {
        const topic = await this.topicService.findById(data.topicId);

        if (!topic) {
            throw new NotFoundException("Tópico não encontrado.");
        }

        const articleSlug = generateSlug(data.title)
        const articleWithSlug = await this.findBySlug(articleSlug);

        if (articleWithSlug) {
            throw new Error("Já existe um artigo com esse slug, tente mudar o título do artigo.");
        }

        const articleCreated = await this.prismaService.article.create({
            data: {
                title: data.title,
                slug: articleSlug,
                content: sanitizeMarkown(data.content),
                description: data.description,
                topicId: data.topicId,
                authorId: data.authorId
            }
        });

        return articleCreated;
    }

    public async findBySlug(slug: string) {
        const article = await this.prismaService.article.findUnique({
            where: { slug }
        });

        return article;
    }

}