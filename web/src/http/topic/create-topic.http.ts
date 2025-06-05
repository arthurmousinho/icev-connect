import { api } from "@/config/api.config";

type Payload = {
   title: string;
}

type Response = {
    accessToken: string;
}

export async function createTopicRequest(payload: Payload) {
    const result = await api.post(
        'topics',
        { json: payload }
    ).json<Response>();

    return result;
}