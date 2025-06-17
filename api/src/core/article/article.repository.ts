import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infra/database/prisma.service";
import type { Article, Prisma } from "generated/prisma";
import type { PaginatedResponse, PaginationOptions } from "src/shared/types/pagination-options.type";

@Injectable()
export class ArticleRepository {

    constructor(
        private readonly prismaService: PrismaService
    ) { }

    public async create(data: {
        title: string;
        slug: string;
        content: string;
        description: string;
        topicId: string;
        authorId: string;
    }) {
        return this.prismaService.article.create({ data });
    }

    public async findById(id: string) {
        return this.prismaService.article.findUnique({
            where: { id },
        });
    }

    public async findBySlug(slug: string) {
        return this.prismaService.article.findUnique({
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
    }

    public async findAll(paginationOptions?: PaginationOptions): Promise<PaginatedResponse<any>> {
        const total = await this.prismaService.article.count();

        const page = paginationOptions?.page ?? 1;
        const limit = paginationOptions?.limit ?? total;

        const skip = (page - 1) * limit;
        const take = limit;

        const articles = await this.prismaService.article.findMany({
            skip,
            take,
            orderBy: {
                createdAt: 'desc'
            },
            select: {
                id: true,
                title: true,
                slug: true,
                description: true,
                likesCount: true,
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

        const lastPage = Math.ceil(total / limit);

        return {
            data: articles,
            meta: {
                total,
                limit,
                page,
                lastPage,
                hasNextPage: page < lastPage,
                hasPreviousPage: page > 1
            }
        };
    }

    public async findAllByTopicSlug(
        topicSlug: string,
        paginationOptions?: PaginationOptions
    ): Promise<PaginatedResponse<any>> {
        const total = await this.prismaService.article.count({
            where: {
                topic: {
                    slug: topicSlug
                }
            }
        });

        const page = paginationOptions?.page ?? 1;
        const limit = paginationOptions?.limit ?? total;

        const skip = (page - 1) * limit;
        const take = limit;

        const articles = await this.prismaService.article.findMany({
            where: {
                topic: {
                    slug: topicSlug
                }
            },
            skip,
            take,
            select: {
                id: true,
                title: true,
                slug: true,
                description: true,
                createdAt: true,
                updatedAt: true,
                likesCount: true,
                author: {
                    select: {
                        avatarUrl: true,
                        name: true,
                    }
                },
                topic: {
                    select: {
                        icon: true,
                        title: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return {
            data: articles,
            meta: {
                total,
                limit,
                page,
                lastPage: Math.ceil(total / limit),
                hasNextPage: page * limit < total,
                hasPreviousPage: page > 1
            }
        };
    }

    public async findAllByUsername(
        username: string,
        paginationOptions?: PaginationOptions
    ): Promise<PaginatedResponse<any>> {

        const total = await this.prismaService.article.count({
            where: {
                author: {
                    username
                }
            }
        });

        const page = paginationOptions?.page ?? 1;
        const limit = paginationOptions?.limit ?? total;

        const skip = (page - 1) * limit;
        const take = limit;

        const articles = await this.prismaService.article.findMany({
            where: {
                author: {
                    username
                }
            },
            skip,
            take,
            select: {
                id: true,
                title: true,
                slug: true,
                likesCount: true,
                description: true,
                createdAt: true,
                updatedAt: true,
                author: {
                    select: {
                        email: true,
                        name: true,
                        avatarUrl: true,
                        username: true
                    }
                },
                topic: {
                    select: {
                        icon: true,
                        title: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return {
            data: articles,
            meta: {
                total,
                limit,
                page,
                lastPage: Math.ceil(total / limit),
                hasNextPage: page * limit < total,
                hasPreviousPage: page > 1
            }
        };
    }

    public async findUserLikeForArticle(data: { userId: string, articleId: string }) {
        return await this.prismaService.articleLike.findUnique({
            where: {
                userId_articleId: {
                    userId: data.userId,
                    articleId: data.articleId
                }
            }
        });
    }

    public async createLike(data: { userId: string, articleId: string }) {
        return await this.prismaService.articleLike.create({
            data: {
                userId: data.userId,
                articleId: data.articleId
            }
        });
    }

    public async deleteLike(data: { userId: string, articleId: string }) {
        return await this.prismaService.articleLike.delete({
            where: {
                userId_articleId: {
                    userId: data.userId,
                    articleId: data.articleId
                }
            }
        });
    }

    public async searchArticles(
        search?: {
            query?: string;
            topicSlugs?: string[];
            orderBy?: 'recent' | 'oldest' | 'relevance';
        },
        paginationOptions?: PaginationOptions
    ): Promise<PaginatedResponse<any>> {
        const { query = '', topicSlugs = [], orderBy } = search ?? {};

        const where: Prisma.ArticleWhereInput = {
            AND: [
                {
                    OR: [
                        { title: { contains: query, mode: 'insensitive' } },
                        { description: { contains: query, mode: 'insensitive' } },
                        { author: { name: { contains: query, mode: 'insensitive' } } },
                    ],
                },
                ...(topicSlugs.length > 0 ? [{ topic: { slug: { in: topicSlugs } } }] : []),
            ],
        };

        const orderByClause: Prisma.ArticleOrderByWithRelationInput | undefined =
            orderBy === 'recent'
                ? { createdAt: 'desc' }
                : orderBy === 'oldest'
                    ? { createdAt: 'asc' }
                    : orderBy === 'relevance'
                        ? { likesCount: 'desc' }
                        : undefined;

        const total = await this.prismaService.article.count({ where });

        const page = paginationOptions?.page ?? 1;
        const limit = paginationOptions?.limit ?? total;

        const skip = (page - 1) * limit;
        const take = limit;

        const articles = await this.prismaService.article.findMany({
            where,
            orderBy: orderByClause,
            skip,
            take,
            select: {
                id: true,
                title: true,
                slug: true,
                description: true,
                likesCount: true,
                createdAt: true,
                updatedAt: true,
                author: {
                    select: {
                        username: true,
                        name: true,
                        avatarUrl: true,
                    },
                },
                topic: {
                    select: {
                        icon: true,
                        title: true,
                    },
                },
            },
        });

        return {
            data: articles,
            meta: {
                total,
                limit,
                page,
                lastPage: Math.ceil(total / limit),
                hasNextPage: page * limit < total,
                hasPreviousPage: page > 1
            }
        };

    }

}