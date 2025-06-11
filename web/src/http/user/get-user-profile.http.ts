import { api } from "@/config/api.config";
import type { UserRole } from "@/types/user";

type Response = {
    data: {
        id: string;
        email: string;
        name: string;
        username: string;
        avatarUrl: string;
        role: UserRole;
        isActive: boolean;
        provider: string;
        createdAt: string;
        updatedAt: string;
    }
}

export async function getUserProfileRequest() {
    const result = await api.get('users/me').json<Response>();
    return result;
}