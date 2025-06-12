import { api } from "@/config/api.config";

export async function likeArticleRequest(articleId: string) {
    return await api.post(`articles/like/${articleId}`)
}