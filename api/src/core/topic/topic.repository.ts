import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infra/database/prisma.service";
import type { FavoriteTopic, Prisma, Topic } from "generated/prisma";

@Injectable()
export class TopicRepository {

    constructor(
        private readonly prismaService: PrismaService
    ) { }

    public async create(data: Prisma.TopicCreateInput): Promise<Topic> {
        return this.prismaService.topic.create({
            data: {
                title: data.title,
                slug: data.slug,
                icon: data.icon
            }
        });
    }

    public async findAll(): Promise<Topic[]> {
        return this.prismaService.topic.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            include: {
                _count: {
                    select: {
                        articles: true
                    }
                }
            }
        });
    }

    public async findBySlug(slug: string): Promise<Topic | null> {
        return this.prismaService.topic.findUnique({
            where: {
                slug
            }
        });
    }

    public async findById(id: string): Promise<Topic | null> {
        return this.prismaService.topic.findUnique({
            where: {
                id
            }
        });
    }

    public async findUserFavoriteTopic(data: { userId: string, topicId: string }) {
        return this.prismaService.favoriteTopic.findUnique({
            where: {
                userId_topicId: {
                    userId: data.userId,
                    topicId: data.topicId
                }
            }
        });
    }

    public async createFavoriteTopic(data: { userId: string, topicId: string }): Promise<FavoriteTopic> {
        return this.prismaService.favoriteTopic.create({
            data: {
                userId: data.userId,
                topicId: data.topicId
            }
        });
    }

    public async deleteFavoriteTopic(data: { userId: string, topicId: string }) {
        return this.prismaService.favoriteTopic.delete({
            where: {
                userId_topicId: {
                    userId: data.userId,
                    topicId: data.topicId
                }
            }
        });
    }

    public async findUserFavoriteTopics(username: string) {
        const favoriteTopicsByUser = await this.prismaService.favoriteTopic.findMany({
            where: {
                user: {
                    username
                }
            },
            select: {
                topic: {
                    select: {
                        title: true,
                        icon: true,
                        slug: true,
                    }
                }
            }
        });

        return favoriteTopicsByUser.map(item => item.topic);
    }

}