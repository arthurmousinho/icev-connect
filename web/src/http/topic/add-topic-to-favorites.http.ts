import { api } from "@/config/api.config";

export async function addTopicToFavoritesRequest(topicId: string) {
    return await api.post(`topics/user/favorite/${topicId}`)
}