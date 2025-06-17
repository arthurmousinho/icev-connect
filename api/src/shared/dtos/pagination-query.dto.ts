import { Type } from "class-transformer";
import { IsInt, IsOptional, Min } from "class-validator";

export class PaginationQuery {

    @IsOptional()
    @Type(() => Number)
    @IsInt({ message: 'A página deve ser um número inteiro' })
    @Min(1, { message: 'A página deve ser maior ou igual a 1' })
    page?: number;

    @IsOptional()
    @Type(() => Number)
    @IsInt({ message: 'O limite deve ser um número inteiro' })
    @Min(1, { message: 'O limite deve ser maior ou igual a 1' })
    limit?: number;

}