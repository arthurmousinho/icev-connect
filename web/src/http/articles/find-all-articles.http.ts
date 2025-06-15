import type { TopicIconType } from "@/types/topic";
import { api } from "@/config/api.config";

type Response = {
    data: {
        id: string;
        title: string;
        slug: string;
        description: string;
        likesCount: number;
        author: {
            name: string;
            email: string;
            avatarUrl: string;
        },
        topic: {
            icon: TopicIconType;
            title: string;
        }
        createdAt: string;
        updatedAt: string;
    }[]
}

export async function findAllArticlesRequest() {
    const result = await api.post('articles/all').json<Response>();
    return result;
}