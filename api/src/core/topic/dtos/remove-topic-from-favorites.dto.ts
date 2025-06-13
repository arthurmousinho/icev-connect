import { IsNotEmpty, IsString } from "class-validator";
import { IsCuid } from "src/shared/decorators/is-cuid.decorator";

export class AddTopicToFavoritesDTO {

    @IsNotEmpty({ message: 'O ID do tópico é obrigatório' })
    @IsString({ message: 'O ID do tópico deve ser uma string' })
    @IsCuid({ message: 'O ID do tópico deve ser um cuid' })
    topicId: string;

    userId: string;

}