import { api } from "@/config/api.config";
import type { TopicIconType } from "@/types/topic";

type Response = {
    data: {
        title: string;
        slug: string;
        icon: TopicIconType
    }[]
}

export async function findUserFavoriteTopicsRequest(slug: string) {
    const result = await api.get('topics/user/favorites').json<Response>();
    return result;
}