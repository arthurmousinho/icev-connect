import { IsArray, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { IsCuid } from "src/shared/decorators/is-cuid.decorator";

export class CreateArticleDTO {

    @IsNotEmpty({ message: 'Título do artigo é obrigatório' })
    @IsString({ message: 'Título do artigo deve ser uma string' })
    @MinLength(6, { message: 'Título do artigo deve conter no mínimo 6 caracteres' })
    @MaxLength(255, { message: 'Título do artigo deve conter no máximo 255 caracteres' })
    title: string;

    @IsNotEmpty({ message: 'Descrição do artigo é obrigatório' })
    @IsString({ message: 'Descrição do artigo deve ser uma string' })
    @MinLength(20, { message: 'Descrição do artigo deve conter no mínimo 20 caracteres' })
    @MaxLength(255, { message: 'Descrição do artigo deve conter no máximo 255 caracteres' })
    description: string;

    @IsNotEmpty({ message: 'O ID do tópico é obrigatório' })
    @IsString({ message: 'O ID do tópico deve ser uma string' })
    @IsCuid({ message: 'O ID do tópico deve ser um cuid' })
    topicId: string;

    @IsNotEmpty({ message: 'O conteúdo do artigo é obrigatório' })
    @IsString({ message: 'Cada item do conteúdo do artigo deve ser uma string', each: true })
    @MinLength(20, { message: 'O conteúdo do artigo deve conter no mínimo 20 caracteres' })
    @MaxLength(10000, { message: 'O conteúdo do artigo deve conter no máximo 10.000 caracteres' })
    content: string;

    authorId: string;

}