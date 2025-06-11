import { NextRequest, NextResponse } from "next/server";
import { decodeJwtPayload } from "./lib/utils";
import { AUTH_TOKEN_KEY, PUBLIC_PATHS } from "./config/contants.config";

function isPublic(pathname: string) {
    return PUBLIC_PATHS.some((prefix) => pathname.startsWith(prefix));
}

function isAdmin(pathname: string) {
    return pathname.startsWith('/admin');
}

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (isPublic(pathname)) {
        return NextResponse.next();
    }

    const token = request.cookies.get(AUTH_TOKEN_KEY)?.value;

    if (!token) {
        return NextResponse.redirect(new URL('/auth', request.url));
    }

    const payload = decodeJwtPayload(token);
    if (!payload || typeof payload !== 'object') {
        return NextResponse.redirect(new URL('/auth', request.url));
    }

    if (isAdmin(pathname) && payload.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

// Apply to all routes except static files and assets
// The matcher pattern excludes _next (Next.js files), favicon.ico, images and fonts
// Any other routes will go through the middleware
export const config = {
    matcher: ['/((?!_next|favicon.ico|images|fonts).*)'],
};