'use server'

import { likeArticleRequest } from '@/http/articles/like-article.http';
import { unlikeArticleRequest } from '@/http/articles/unlike-article.http';
import { HTTPError } from 'ky';
import { revalidateTag } from 'next/cache';

export async function likeArticleAction(articleId: string) {
    try {

        await likeArticleRequest(articleId);

        revalidateTag('articles/*');

        return {
            message: 'Artigo curtido com sucesso!',
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

export async function unlikeArticleAction(articleId: string) {
    try {

        await unlikeArticleRequest(articleId);

        return {
            message: 'Curtida removida com sucesso!',
            success: true,
        }

    } catch (error) {
        if (error instanceof HTTPError) {
            const { message } = await error.response.json();
            return { message, success: false }
        }

        return {
            message: 'Erro inesperado, tente novamente mais tarde',
            success: false,
        }
    }

}