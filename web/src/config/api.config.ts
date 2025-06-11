import ky from 'ky';
import { AUTH_TOKEN_KEY } from './contants.config';
import { redirect } from 'next/navigation';

export const api = ky.create({
    prefixUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    // For client-side components: Include credentials to send JWT token via cookies,
    // becouse we are using HttpOnly cookies
    credentials: 'include',
    throwHttpErrors: true,
    hooks: {
        beforeRequest: [
            async (request) => {
                // And, for server-side components: Add JWT token to Authorization header
                // This is needed because cookies are not automatically passed in SSR

                let token: string | undefined

                const isServerSide = typeof window === 'undefined'

                if (isServerSide) {
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
                if (response.status === 404) {
                    redirect('/not-found')
                }
            },
        ],
    },
})
