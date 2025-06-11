'use server';

import { cookies } from "next/headers";
import { AUTH_TOKEN_KEY } from "@/config/contants.config";

export async function saveTokenAction(token: string) {
    'use server';

    (await cookies()).set(AUTH_TOKEN_KEY, token, {
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
    });
}