import { api } from "@/config/api.config";
import type { TopicIconType } from "@/types/topic";

type Response = {
    data: {
        id: string;
        name: string;
        username: string;
        avatarUrl: string;
        favoriteTopics: {
            title: string;
            slug: string;
            icon: TopicIconType
        }[]
    }
}

export async function findUserByUsernameRequest(username: string) {
    const result = await api.get(`users/${username}`).json<Response>();
    return result;
}