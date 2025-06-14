import { ArticleCard } from "@/components/article-card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowDown, Search, TextSearch, Trash } from "lucide-react";
import { findAllTopicsRequest } from "@/http/topic/find-all-topics.http";
import { searchArticlesRequest } from "@/http/articles/search-articles.http";
import { SearchForm } from "./search-form";
import type { SearchData } from "@/types/search";
import Link from "next/link";
import { cn } from "@/lib/utils";

type SearchPageProps = {
    searchParams: Promise<SearchData>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {

    const { query, topicSlugs, orderBy } = await searchParams;

    const payload = {
        query,
        orderBy,
        topicSlugs: Array.isArray(topicSlugs)
            ? topicSlugs
            : topicSlugs
                ? [topicSlugs]
                : [],
    };

    const [
        { data: topics },
        { data: articles }
    ] = await Promise.all([
        findAllTopicsRequest(),
        searchArticlesRequest(payload),
    ])

    return (
        <div className="flex flex-col h-dvh justify-top items-center w-full">
            <div className="w-full max-w-[1200px] flex flex-row items-start justify-center gap-10">
                <header className="flex flex-col items-center justify-between gap-4 sticky top-20 w-[500px]">
                    <div className="flex flex-col justify-start gap-2 w-full">
                        <TextSearch size={50} />
                        <h1 className="font-bold text-2xl">Buscar Artigos</h1>
                    </div>
                    <SearchForm
                        topics={topics}
                        defaultValues={payload}
                    />
                </header>
                <div className="flex flex-col w-full pb-10">
                    <header className="flex items-center justify-between">
                        <div className="flex flex-row items-center gap-2">
                            <Search size={20} />
                            <p className="text-sm font-medium">
                                <span className="font-bold">{articles.length}</span> resultados encontrados
                            </p>
                        </div>
                        <Link href="/search" className={cn(buttonVariants({ variant: 'outline' }))}>
                            <Trash />
                            Limpar Filtros
                        </Link>
                    </header>
                    <Separator className="my-6" />
                    {articles.length === 0 && (
                        <p className="text-sm text-muted-foreground">
                            Nenhum artigo encontrado.
                        </p>
                    )}
                    {articles.map((article) => (
                        <div key={article.id}>
                            <ArticleCard
                                title={article.title}
                                slug={article.slug}
                                description={article.description}
                                authorName={article.author.name}
                                authorAvatarUrl={article.author.avatarUrl}
                                likesCount={article.likesCount}
                                topicTitle={article.topic.title}
                                createdAt={article.createdAt}
                            />
                            <Separator className="my-6" />
                        </div>
                    ))}
                    {articles.length > 0 && (
                        <footer className="flex justify-end mt-6">
                            <Button variant="secondary">
                                Carregar mais
                                <ArrowDown size={20} />
                            </Button>
                        </footer>
                    )}
                </div>
            </div>
        </div>
    );
}