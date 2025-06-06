import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/infra/database/prisma.service";
import { generateSlug } from "src/shared/utils/generate-slug.util";
import type { CreateTopicDTO } from "./dtos/create-topic.dto";
import type { FindMethodOptions } from "src/shared/types/find-method-options.type";

@Injectable()
export class TopicService {

    constructor(
        private readonly prismaService: PrismaService
    ) { }

    public async create(data: CreateTopicDTO) {
        const topicSlug = generateSlug(data.title)

        const topicWithSlug = await this.findBySlug(
            topicSlug,
            { throwError: false }
        );

        if (topicWithSlug) {
            throw new ConflictException('Já existe um tópico com esse slug, tente mudar o título do tópico.')
        }

        const topicCreated = await this.prismaService.topic.create({
            data: {
                title: data.title,
                slug: topicSlug,
                icon: data.icon
            }
        });

        return topicCreated;
    }

    public async findAll() {
        const topics = await this.prismaService.topic.findMany({
            include: {
                _count: {
                    select: {
                        articles: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return topics.map(topic => ({
            ...topic,
            articlesCount: topic._count.articles,
            _count: undefined
        }));
    }

    public async findBySlug(
        slug: string,
        options: FindMethodOptions = {
            throwError: true
        }
    ) {
        const topic = await this.prismaService.topic.findUnique({
            where: {
                slug
            }
        });

        if (!topic && !options?.throwError) {
            throw new NotFoundException('Tópico não encontrado.')
        }

        return topic;
    }

    public async findById(id: string) {
        const topic = await this.prismaService.topic.findUnique({
            where: {
                id
            }
        });

        return topic;
    }

    public async deleteById(id: string) {
        const topic = await this.findById(id)

        if (!topic) {
            throw new NotFoundException('Tópico não encontrado.')
        }

        await this.prismaService.topic.delete({
            where: {
                id
            }
        });
    }

}