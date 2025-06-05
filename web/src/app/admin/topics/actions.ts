'use server'

import { createTopicRequest } from '@/http/topic/create-topic.http';
import { HTTPError } from 'ky';
import { revalidateTag } from 'next/cache';

type Params = {
    title: string;
}

export async function createTopicAction(data: Params) {
    try {   

        await createTopicRequest(data);

        revalidateTag('topics');

        return {
            message: 'Tópico criado com sucesso',
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