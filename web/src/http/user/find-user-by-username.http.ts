import { api } from "@/config/api.config";

type Response = {
    data: {
        id: string;
        name: string;
        username: string;
        avatarUrl: string;
    }
}

export async function findUserByUsernameRequest(username: string) {
    const result = await api.get(`users/${username}`).json<Response>();
    return result;
}