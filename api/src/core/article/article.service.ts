import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/infra/database/prisma.service";
import { generateSlug } from "src/shared/utils/generate-slug.util";
import { sanitizeMarkown } from "src/shared/utils/mardown-sanitizer.util";
import { TopicService } from "../topic/topic.service";
import type { CreateArticleDTO } from "./dtos/create-article.dto";
import type { FindMethodOptions } from "src/shared/types/find-method-options.type";

@Injectable()
export class ArticleService {

    constructor(
        private readonly prismaService: PrismaService,
        private readonly topicService: TopicService
    ) { }

    public async findBySlug(
        slug: string,
        options: FindMethodOptions = {
            throwError: true
        }
    ) {
        const article = await this.prismaService.article.findFirst({
            where: { slug },
            include: {
                topic: {
                    select: {
                        slug: true,
                        icon: true,
                        title: true
                    }
                },
                author: {
                    select: {
                        avatarUrl: true,
                        name: true,
                        username: true
                    }
                }
            }
        });

        if (!article && options?.throwError) {
            throw new NotFoundException('Artigo não encontrado.');
        }

        return article;
    }

    public async findAll() {
        const articles = await this.prismaService.article.findMany({
            select: {
                id: true,
                title: true,
                slug: true,
                description: true,
                createdAt: true,
                updatedAt: true,
                author: {
                    select: {
                        email: true,
                        name: true,
                        avatarUrl: true
                    }
                },
                topic: {
                    select: {
                        icon: true,
                        title: true
                    }
                }
            }
        });

        return articles;
    }

    public async findAllByTopicSlug(topicSlug: string) {
        const topic = await this.topicService.findBySlug(topicSlug);

        const articlesByTopicSlug = await this.prismaService.article.findMany({
            where: {
                topicId: topic?.id
            },
            select: {
                id: true,
                title: true,
                slug: true,
                description: true,
                createdAt: true,
                updatedAt: true,
                author: {
                    select: {
                        email: true,
                        name: true,
                        avatarUrl: true
                    }
                },
                topic: {
                    select: {
                        icon: true,
                        title: true
                    }
                }
            }
        })

        return articlesByTopicSlug;
    }

    public async create(data: CreateArticleDTO) {
        const topic = await this.topicService.findById(data.topicId);

        if (!topic) {
            throw new NotFoundException("Tópico não encontrado.");
        }

        const articleSlug = generateSlug(data.title);

        const articleWithSlug = await this.findBySlug(
            articleSlug,
            { throwError: false }
        );

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

}