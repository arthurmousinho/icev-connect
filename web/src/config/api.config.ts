import ky from 'ky';
import { getCookie } from 'cookies-next'
import { AUTH_TOKEN_KEY } from './contants.config';
import { redirect } from 'next/navigation';

export const api = ky.create({
    prefixUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    hooks: {
        beforeRequest: [
            async (request) => {
                let token: string | undefined

                const isServerSide = typeof window !== 'undefined'

                if (isServerSide) {
                    token = getCookie(AUTH_TOKEN_KEY) as string | undefined
                } else {
                    const { cookies: getServerCookies } = await import('next/headers');
                    const cookieStore = await getServerCookies();
                    token = cookieStore.get(AUTH_TOKEN_KEY)?.value;
                }

                if (token) {
                    request.headers.set('Authorization', `Bearer ${token}`)
                }
            },
        ],
        afterResponse: [
            async (request, options, response) => {
                if (response.status === 401 || response.status === 404) {
                    redirect('/not-found')
                }
            },
        ],
    },
    throwHttpErrors: true,
})