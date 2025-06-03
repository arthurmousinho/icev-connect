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
            throw new ConflictException('Conflito ao gerar o slug do artigo, tente outro título.')
        }

        const topicCreated = await this.prismaService.topic.create({
            data: {
                title: data.title,
                slug: topicSlug
            }
        });

        return topicCreated;
    }

}