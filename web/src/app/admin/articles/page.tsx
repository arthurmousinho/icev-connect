import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Paginator } from "@/components/paginator";
import { findAllArticlesRequest } from "@/http/articles/find-all-articles.http";
import { TopicButton } from "@/components/topic-button";
import { UserBadge } from "@/components/user-badge";
import { LikeButton } from "@/app/(app)/article/[slug]/like-button";
import { ArticleDetailsSheet } from "./article-details-sheet";

type TopicsPageProps = {
    searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function ArticlesPage({ searchParams }: TopicsPageProps) {

    const params = await searchParams;

    const currentPage = parseInt((params.page as string) || '1');
    const currentLimit = parseInt((params.limit as string) || '10');

    const { data } = await findAllArticlesRequest();

    return (
        <div className="space-y-4">
            <header className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight">
                    Artigos
                </h2>
            </header>
            <main>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-1/3">Título</TableHead>
                            <TableHead>Tópico</TableHead>
                            <TableHead>Autor</TableHead>
                            <TableHead>Curtidas</TableHead>
                            <TableHead className="text-right">Detalhes</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map(article => (
                            <TableRow key={article.id}>
                                <TableCell className="max-w-0 truncate">
                                    <div className="truncate" title={article.title}>
                                        {article.title}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <TopicButton
                                        title={article.topic.title}
                                        icon={article.topic.icon}
                                    />
                                </TableCell>
                                <TableCell>
                                    <UserBadge
                                        name={article.author.name}
                                        avatarUrl={article.author.avatarUrl}
                                    />
                                </TableCell>
                                <TableCell>
                                    <LikeButton count={article.likesCount} />
                                </TableCell>
                                <TableCell className="text-right">
                                    <ArticleDetailsSheet data={article} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={5}>
                                <Paginator
                                    meta={{
                                        hasNextPage: false,
                                        hasPreviousPage: true,
                                        lastPage: 3,
                                        limit: 10,
                                        total: 100,
                                        page: 1
                                    }}
                                    showing={20}
                                    basePath="/admin/articles"
                                />
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </main>
        </div>
    )
}
