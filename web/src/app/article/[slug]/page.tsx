import "@/styles/markdown.css";

import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import { Separator } from "@/components/ui/separator";
import { UserBadge } from "@/components/user-badge";
import { Header } from "@/components/header";
import { findArticleBySlugRequest } from "@/http/articles/find-article-by-slug.http";
import { formatDate } from "@/lib/utils";
import { LikeButton } from "@/app/article/[slug]/like-button";

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
                <header className="flex flex-col gap-2">
                    <Link
                        href={`/topic/${data.topic.slug}`}
                        className="text-sm font-semibold text-muted-foreground hover:underline underline-offset-4"
                    >
                        {data.topic.title}
                    </Link>
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
                        <LikeButton
                            count={42}
                            hasLiked={data.hasLiked}
                            articleId={data.id}
                        />
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