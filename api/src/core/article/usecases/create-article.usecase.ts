import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { ArticleRepository } from "../article.repository";
import { FindTopicByIdUseCase } from "src/core/topic/usecases/find-topic-by-id.usecase";
import { generateSlug } from "src/shared/utils/generate-slug.util";
import type { CreateArticleDTO } from "../dtos/create-article.dto";

@Injectable()
export class CreateArticleUseCase {

    constructor(
        private readonly articleRepository: ArticleRepository,
        private readonly findTopicByIdUseCase: FindTopicByIdUseCase,
    ) { }

    public async execute(data: CreateArticleDTO) {

        const topic = await this.findTopicByIdUseCase.execute(data.topicId);

        if (!topic) {
            throw new NotFoundException("Tópico não encontrado.");
        }

        const articleSlug = generateSlug(data.title);

        const articleWithSlug = await this.articleRepository.findBySlug(articleSlug);
        
        if (articleWithSlug) {
            throw new ConflictException("Já existe um artigo com esse slug, tente mudar o título do artigo.");
        }

        const articleCreated = await this.articleRepository.create({
            title: data.title,
            slug: articleSlug,
            content: data.content,
            description: data.description,
            topicId: data.topicId,
            authorId: data.authorId
        });

        return articleCreated;
    }

}