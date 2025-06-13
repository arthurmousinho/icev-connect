'use server'

import { addTopicToFavoritesRequest } from '@/http/topic/add-topic-to-favorites.http';
import { removeTopicFromFavoritesRequest } from '@/http/topic/remove-topic-from-favorites.http';
import { HTTPError } from 'ky';

export async function addTopicToFavoriteAction(topicId: string) {
    try {

        await addTopicToFavoritesRequest(topicId);

        return {
            message: 'Tópico favoritado com sucesso!',
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

export async function removeTopicFromFavoritesAction(topicId: string) {
    try {

        await removeTopicFromFavoritesRequest(topicId);

        return {
            message: 'Tópico removido dos favoritos com sucesso!',
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