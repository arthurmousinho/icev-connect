import { api } from "@/config/api.config";
import type { TopicIconType } from "@/types/topic";

type Response = {
    data: {
        id: string;
        title: string;
        slug: string;
        createdAt: string;
        updatedAt: string;
        icon: TopicIconType,
        ranking: {
            position: number;
            user: {
                name: string;
                username: string;
                avatarUrl: string ;
            },
            likesCount: number;
        }[]
    }
}

export async function findTopicBySlugRequest(slug: string) {
    const result = await api.post(`topics/${slug}`).json<Response>();
    return result;
}