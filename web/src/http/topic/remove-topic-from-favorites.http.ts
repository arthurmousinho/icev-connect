import { api } from "@/config/api.config";

export async function removeTopicFromFavoritesRequest(topicId: string) {
    return await api.delete(`topics/user/favorite/${topicId}`)
}