import "@/styles/markdown.css";

import { Separator } from "@/components/ui/separator";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import { UserBadge } from "@/components/user-badge";
import { LikesBadge } from "@/components/likes-badge";
import { Header } from "@/components/header";
import { findArticleBySlugRequest } from "@/http/articles/find-article-by-slug.http";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

type ArticlePageProps = {
    params: Promise<{ slug: string }>;
}

export default async function ArticlePage({ params }: ArticlePageProps) {

    const { slug } = await params;
    const { data } = await findArticleBySlugRequest(slug);

    return (
        <div className="flex flex-col h-dvh justify-top items-center gap-10">
            <Header />
            <main className="w-full max-w-[800px] space-y-10 pb-10">
                <header className="space-y-4">
                    <p className="text-sm font-semibold text-muted-foreground">
                        {data.topic.title}
                    </p>
                    <h3 className="text-4xl font-semibold text-balance">
                        {data.title}
                    </h3>
                    <p className="text-muted-foreground line-clamp-3 leading-relaxed">
                        {data.description}
                    </p>
                    <footer className="mt-3 flex flex-row items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Link
                                href={`/user/${data.author.username}`}
                                className="hover:underline underline-offset-4"
                            >
                                <UserBadge
                                    name={data.author.name}
                                    avatarUrl={data.author.avatarUrl}
                                />
                            </Link>
                            <span className="text-muted-foreground">
                                em {formatDate(data.createdAt)}
                            </span>
                        </div>
                        <LikesBadge count={42} />
                    </footer>
                    <Separator />
                </header>
                <div className="markdown-body markdown-light">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeSanitize]}
                    >
                        {data.content}
                    </ReactMarkdown>
                </div>
            </main>
        </div>
    )
}