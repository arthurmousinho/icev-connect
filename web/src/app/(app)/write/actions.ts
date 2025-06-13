'use server'

import { createArticleRequest } from '@/http/articles/create-article.http';
import { HTTPError } from 'ky';

type CreateArticleActionParams = {
    title: string;
    description: string;
    content: string;
    topicId: string;
}

export async function createArticleAction(data: CreateArticleActionParams) {
    try {
        
        await createArticleRequest(data);

        return {
            message: 'Artigo publicado com sucesso!',
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