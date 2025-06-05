import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/infra/database/prisma.service";
import { generateSlug } from "src/utils/generate-slug.util";
import type { CreateTopicDTO } from "./dtos/create-topic.dto";

@Injectable()
export class TopicService {

    constructor(
        private readonly prismaService: PrismaService
    ) { }

    public async create(data: CreateTopicDTO) {
        const topicSlug = generateSlug(data.title)

        const topicWithSlug = await this.findBySlug(topicSlug);

        if (topicWithSlug) {
            throw new ConflictException('Já existe um tópico com esse slug, tente mudar o título do tópico.')
        }

        const topicCreated = await this.prismaService.topic.create({
            data: {
                title: data.title,
                slug: topicSlug
            }
        });

        return topicCreated;
    }

    public async findAll() {
        const topics = await this.prismaService.topic.findMany({
            include: {
                _count: {
                    select: {
                        posts: true
                    }
                }
            }
        });

        return topics.map(topic => ({
            ...topic,
            postsCount: topic._count.posts,
            _count: undefined
        }));
    }

    public async findBySlug(slug: string) {
        const topic = await this.prismaService.topic.findUnique({
            where: {
                slug
            }
        });

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