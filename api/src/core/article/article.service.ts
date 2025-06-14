import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/infra/database/prisma.service";
import { generateSlug } from "src/shared/utils/generate-slug.util";
import { TopicService } from "../topic/topic.service";
import { UserService } from "../user/user.service";
import type { CreateArticleDTO } from "./dtos/create-article.dto";
import type { FindMethodOptions } from "src/shared/types/find-method-options.type";
import type { AddLikeDTO } from "./dtos/add-like.dto";
import type { RemoveLikeDTO } from "./dtos/remove-like.dto";
import type { SearchArticlesDTO } from "./dtos/search-articles.dto";

@Injectable()
export class ArticleService {

    constructor(
        private readonly prismaService: PrismaService,
        private readonly topicService: TopicService,
        private readonly userService: UserService
    ) { }

    public async findBySlug(
        data: { slug: string, userId?: string },
        options: FindMethodOptions = { throwError: true },
    ) {
        const article = await this.prismaService.article.findFirst({
            where: { slug: data.slug },
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

        if (!article) {
            return null;
        }

        let hasLiked = false;

        if (data.userId) {
            const like = await this.findUserLikeForArticle(
                { userId: data.userId, articleId: article.id },
                { throwError: false }
            );

            hasLiked = !!like;
        }

        return {
            ...article,
            hasLiked
        };
    }

    public async findById(
        id: string,
        options: FindMethodOptions = { throwError: true }
    ) {
        const article = await this.prismaService.article.findFirst({
            where: { id }
        });

        if (!article && options?.throwError) {
            throw new NotFoundException('Artigo não encontrado.');
        }

        return article;
    }

    public async findAll(search?: SearchArticlesDTO) {
        const articles = await this.prismaService.article.findMany({
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

        return articles;
    }

    public async findAllByTopicSlug(topicSlug: string) {
        const topic = await this.topicService.findBySlug({ slug: topicSlug });

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
        })

        return articlesByTopicSlug;
    }

    public async findAllByUsername(username: string) {
        await this.userService.findByUsername(username);

        const articles = await this.prismaService.article.findMany({
            where: {
                author: {
                    username
                }
            },
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

        return articles;
    }

    private async findUserLikeForArticle(
        data: { userId: string, articleId: string },
        options: FindMethodOptions = { throwError: true }
    ) {
        const articleLikeByUser = await this.prismaService.articleLike.findUnique({
            where: {
                userId_articleId: {
                    userId: data.userId,
                    articleId: data.articleId
                }
            }
        });

        if (!articleLikeByUser && options.throwError) {
            throw new BadRequestException('Você não curtiu esse artigo');
        }

        return articleLikeByUser;
    }

    public async create(data: CreateArticleDTO) {
        const topic = await this.topicService.findById(data.topicId);

        if (!topic) {
            throw new NotFoundException("Tópico não encontrado.");
        }

        const articleSlug = generateSlug(data.title);

        const articleWithSlug = await this.findBySlug(
            { slug: articleSlug },
            { throwError: false }
        );

        if (articleWithSlug) {
            throw new Error("Já existe um artigo com esse slug, tente mudar o título do artigo.");
        }

        const articleCreated = await this.prismaService.article.create({
            data: {
                title: data.title,
                slug: articleSlug,
                content: data.content,
                description: data.description,
                topicId: data.topicId,
                authorId: data.authorId
            }
        });

        return articleCreated;
    }

    public async addLike(data: AddLikeDTO) {
        const [articleExists, alreadyLiked] = await Promise.all([
            this.findById(data.articleId),
            this.findUserLikeForArticle(data, { throwError: false })
        ]);

        if (alreadyLiked) {
            throw new ConflictException('Você já curtiu esse artigo');
        }

        await this.prismaService.$transaction([
            this.prismaService.articleLike.create({
                data: {
                    userId: data.userId,
                    articleId: data.articleId
                }
            }),
            this.prismaService.article.update({
                where: {
                    id: data.articleId
                },
                data: {
                    likesCount: {
                        increment: 1
                    }
                }
            })
        ]);

        return;
    }

    public async removeLike(data: RemoveLikeDTO) {
        await Promise.all([
            this.findById(data.articleId),
            this.findUserLikeForArticle(data, { throwError: true })
        ]);

        await this.prismaService.$transaction([
            this.prismaService.articleLike.delete({
                where: {
                    userId_articleId: {
                        userId: data.userId,
                        articleId: data.articleId
                    }
                }
            }),
            this.prismaService.article.update({
                where: {
                    id: data.articleId
                },
                data: {
                    likesCount: {
                        decrement: 1
                    }
                }
            })
        ]);

        return;
    }

    public async searchArticles(search?: SearchArticlesDTO) {
        const { query = '', topicSlugs = [], orderBy } = search ?? {};

        const articles = await this.prismaService.article.findMany({
            where: {
                AND: [
                    {
                        OR: [
                            { title: { contains: query, mode: 'insensitive' } },
                            { description: { contains: query, mode: 'insensitive' } },
                            { author: { name: { contains: query, mode: 'insensitive' } } },
                        ],
                    },
                    topicSlugs.length > 0
                        ? { topic: { slug: { in: topicSlugs } } }
                        : {},
                ],
            },
            orderBy:
                orderBy === 'recent'
                    ? { createdAt: 'desc' }
                    : orderBy === 'oldest'
                        ? { createdAt: 'asc' }
                        : orderBy === 'relevance'
                            ? { likesCount: 'desc' }
                            : undefined,
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

        return articles;
    }

}