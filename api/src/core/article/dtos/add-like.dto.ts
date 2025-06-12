import { IsNotEmpty, IsString } from "class-validator";
import { IsCuid } from "src/shared/decorators/is-cuid.decorator";

export class AddLikeDTO {

    @IsNotEmpty({ message: 'O ID do artigo é obrigatório' })
    @IsString({ message: 'O ID do artigo deve ser uma string' })
    @IsCuid({ message: 'O ID do artigo deve ser um cuid' })
    articleId: string;

    userId: string;

}