import { api } from "@/config/api.config";

export async function unlikeArticleRequest(articleId: string) {
    return await api.delete(`articles/like/${articleId}`)
}