import type { TopicIcon } from "@/components/topic-button";
import { api } from "@/config/api.config";

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
            icon: TopicIcon;
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