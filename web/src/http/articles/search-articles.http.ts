import { api } from "@/config/api.config";
import type { TopicIconType } from "@/types/topic";
import type { SearchData } from "@/types/search";

type Response = {
    data: {
        id: string;
        title: string;
        slug: string;
        description: string;
        author: {
            name: string;
            username: string;
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

export async function searchArticlesRequest(payload: SearchData) {
    console.log(payload)
    const result = await api.post('articles/search', { json: payload }).json<Response>();
    return result;
}