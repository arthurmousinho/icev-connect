import { ConflictException, Injectable } from "@nestjs/common";
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

        const topicExistsWithSlug = await this.prismaService.topic.findUnique({
            where: {
                slug: topicSlug
            }
        });

        if (topicExistsWithSlug) {
            throw new ConflictException('Conflito ao gerar o slug do tópico, tente outro título.')
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

}