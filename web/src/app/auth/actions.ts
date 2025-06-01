'use server';

import { cookies } from "next/headers";

export async function saveTokenAction(token: string) {
    'use server';

    (await cookies()).set('icev_connect_token', token, {
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
    });
}