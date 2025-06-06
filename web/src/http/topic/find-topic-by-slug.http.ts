import type { TopicIcon } from "@/components/topic-button";
import { api } from "@/config/api.config";

type Response = {
    data: {
        id: string;
        title: string;
        slug: string;
        createdAt: string;
        updatedAt: string;
        icon: TopicIcon
    }
}

export async function findTopicBySlugRequest(slug: string) {
    const result = await api.post(`topics/${slug}`).json<Response>();
    return result;
}