import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreVertical } from "lucide-react";
import { Paginator } from "@/components/paginator";
import { findAllArticlesRequest } from "@/http/articles/find-all-articles.http";
import { TopicButton, TopicIcon } from "@/components/topic-button";
import { UserBadge } from "@/components/user-badge";

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
                            <TableHead>Título</TableHead>
                            <TableHead>Tópico</TableHead>
                            <TableHead>Autor</TableHead>
                            <TableHead className="text-right">Opções</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map(article => (
                            <TableRow key={article.id}>
                                <TableCell>
                                    {article.title}
                                </TableCell>
                                <TableCell>
                                    <TopicButton
                                        title={article.topic.title}
                                        slug={''}
                                        isActive={false}
                                        icon={TopicIcon[article.topic.icon]}
                                    />
                                </TableCell>
                                <TableCell>
                                    <UserBadge 
                                        name={article.author.name}
                                        avatarUrl={article.author.avatarUrl}
                                    />
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="outline" size="icon">
                                        <MoreVertical />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={4}>
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
                                    basePath="/admin/topics"
                                />
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </main>
        </div>
    )
}