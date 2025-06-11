import { api } from "@/config/api.config";

type Payload = {
    title: string;
    description: string;
    content: string;
    topicId: string;
}

type Response = {
    id: string;
    title: string;
    description: string;
    content: string;
    slug: string;
    topicId: string;
    authorId: string;
    createdAt: string;
    updatedAt: string;
}

export async function createArticleRequest(payload: Payload) {
    const result = await api.post(
        'articles',
        { json: payload }
    ).json<Response>();

    return result;
}