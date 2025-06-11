import { api } from "@/config/api.config";

type Response = {
    data: {
        id: string;
        title: string;
        description: string;
        content: string;
        slug: string;
        topicId: string;
        authorId: string;
        createdAt: string;
        updatedAt: string;
        topic: {
            slug: string;
            icon: string;
            title: string;
        };
        author: {
            avatarUrl: string;
            name: string;
            username: string;
        },
    }
}

export async function findArticleBySlugRequest(slug: string) {
    const result = await api.get(`articles/${slug}`).json<Response>();
    return result;
}