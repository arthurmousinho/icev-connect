'use server'

import { likeArticleRequest } from '@/http/articles/like-article.http';
import { HTTPError } from 'ky';

export async function likeArticleAction(articleId: string) {
    try {

        await likeArticleRequest(articleId)

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
        
        await unlikeArticleAction(articleId)

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