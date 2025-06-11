import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreVertical } from "lucide-react";
import { Paginator } from "@/components/paginator";
import { TopicSlugBadge } from "./topic-slug-badge";
import { CreateTopicDialog } from "./create-topic-dialog";
import { findAllTopicsRequest } from "@/http/topic/find-all-topics.http";
import { TopicButton } from "@/components/topic-button";

type TopicsPageProps = {
    searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function TopicsPage({ searchParams }: TopicsPageProps) {

    const params = await searchParams;

    const currentPage = parseInt((params.page as string) || '1');
    const currentLimit = parseInt((params.limit as string) || '10');

    const { data } = await findAllTopicsRequest();

    return (
        <div className="space-y-4">
            <header className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight">
                    Tópicos
                </h2>
                <CreateTopicDialog />
            </header>
            <main>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Título</TableHead>
                            <TableHead>Slug</TableHead>
                            <TableHead>Artigos</TableHead>
                            <TableHead className="text-right">Opções</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map(topic => (
                            <TableRow key={topic.id}>
                                <TableCell className="flex items-center gap-2">
                                    <TopicButton
                                        title={topic.title}
                                        icon={topic.icon}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TopicSlugBadge slug={topic.slug} />
                                </TableCell>
                                <TableCell>
                                    {topic.postsCount ?? 0} artigos
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