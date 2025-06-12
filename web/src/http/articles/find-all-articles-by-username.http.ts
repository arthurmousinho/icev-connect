import { api } from "@/config/api.config";
import type { TopicIconType } from "@/types/topic";

type Response = {
    data: {
        id: string;
        title: string;
        slug: string;
        description: string;
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
        likesCount: number;
    }[]
}

export async function findAllArticlesByUsernameRequest(username: string) {
    const result = await api.post(`articles/user/${username}`).json<Response>();
    return result;
}