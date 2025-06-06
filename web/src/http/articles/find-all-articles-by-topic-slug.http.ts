import { api } from "@/config/api.config";

type Response = {
    data: {
        id: string;
        title: string;
        slug: string;
        description: string;
        author: {
            name: string;
            avatarUrl: string;
        },
        topic: {
            id: string;
            title: string;
        }
        createdAt: string;
        updatedAt: string;
    }[]
}

export async function findAllArticlesByTopicSlug(topicSlug: string) {
    const result = await api.post(`articles/topic/${topicSlug}`).json<Response>();
    return result;
}