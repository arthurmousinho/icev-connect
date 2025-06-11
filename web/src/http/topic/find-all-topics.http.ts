
import type { TopicIcon } from "@/components/topic-button";
import { api } from "@/config/api.config";

type Response = {
    data: {
        id: string;
        title: string;
        slug: string;
        createdAt: string;
        updatedAt: string;
        postsCount: number;
        icon: TopicIcon
    }[]
}

export async function findAllTopicsRequest() {
    const result = await api.post('topics/all').json<Response>();
    return result;
}