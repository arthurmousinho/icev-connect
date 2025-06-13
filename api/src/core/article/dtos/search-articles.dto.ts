import { IsArray, IsIn, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class SearchArticlesDTO {

    @IsOptional({ message: 'A busca é opcional.' })
    @IsString({ message: 'A busca deve ser um texto.' })
    query?: string;

    @IsOptional({ message: 'Os tópicos são opcionais.' })
    @IsArray({ message: 'Os tópicos devem ser um array de slugs.' })
    @Type(() => String)
    @IsString({ each: true, message: 'Cada tópico deve ser um texto (slug).' })
    topicSlugs?: string[];

    @IsOptional({ message: 'A ordenação é opcional.' })
    @IsIn(['relevance', 'recent', 'oldest'], {
        message: 'A ordenação deve ser "relevance", "recent" ou "oldest".',
    })
    orderBy?: 'relevance' | 'recent' | 'oldest';

}