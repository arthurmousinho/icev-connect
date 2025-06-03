import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateTopicDTO {

    @IsNotEmpty({ message: 'Título do tópico é obrigatório' })
    @IsString({ message: 'Título do tópico deve ser uma string' })
    @MinLength(6, { message: 'Título do tópico deve conter no mínimo 6 caracteres' })
    @MaxLength(255, { message: 'Título do tópico deve conter no máximo 255 caracteres' })
    title: string;

}