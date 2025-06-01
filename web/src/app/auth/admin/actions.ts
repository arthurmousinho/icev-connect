'use server'

import { cookies } from 'next/headers';
import { HTTPError } from 'ky';
import { adminLoginRequest } from '@/http/auth/login-user.http';
import { AUTH_TOKEN_KEY } from '@/config/contants.config';

type Params = {
    email: string;
    password: string;
}

export async function adminLoginAction(data: Params) {
    try {
        const cookiesData = await cookies();

        const { token } = await adminLoginRequest({
            email: data.email,
            password: data.password
        });

        cookiesData.set(AUTH_TOKEN_KEY, token, {
            path: '/',
            maxAge: 60 * 60 * 24 * 7, // 24 hours
        });

        return {
            message: 'Login realizado com sucesso',
            success: true,
        }

    } catch (error) {
        if (error instanceof HTTPError) {
            const { message } = await error.response.json();
            return { message, success: false }
        }

        console.error(error);

        return {
            message: 'Erro inesperado, tente novamente mais tarde',
            success: false,
        }
    }

}