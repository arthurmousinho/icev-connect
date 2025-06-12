import { ArticleCard } from "@/components/article-card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowDown } from "lucide-react";
import { TopicHeader } from "./topic-header";
import { Header } from "@/components/header";
import { findTopicBySlugRequest } from "@/http/topic/find-topic-by-slug.http";
import { findAllArticlesByTopicSlugRequest } from "@/http/articles/find-all-articles-by-topic-slug.http";

type TopicPageProps = {
    params: Promise<{ slug: string }>;
}

export default async function TopicPage({ params }: TopicPageProps) {

    const { slug } = await params;
    const { data: topicData } = await findTopicBySlugRequest(slug);
    const { data: topicArticles } = await findAllArticlesByTopicSlugRequest(slug);

    return (
        <div className="flex flex-col h-dvh justify-top items-center gap-10">
            <Header />
            <div className="w-full max-w-[1200px] flex flex-row items-start justify-center gap-10">
                <TopicHeader
                    title={topicData.title}
                    icon={topicData.icon}
                />
                <div className="flex flex-col w-full pb-10">
                    {topicArticles.map(article => (
                        <div key={article.id}>
                            <ArticleCard
                                title={article.title}
                                slug={article.slug}
                                description={article.description}
                                authorName={article.author.name}
                                authorAvatarUrl={article.author.avatarUrl}
                                topicTitle={article.topic.title}
                                createdAt={article.createdAt}
                                likesCount={article.likesCount}
                            />
                            <Separator className="my-6" />
                        </div>
                    ))}
                    <footer className="flex justify-end mt-6">
                        <Button variant="secondary">
                            Carregar mais
                            <ArrowDown size={20} />
                        </Button>
                    </footer>
                </div>
            </div>
        </div>
    )
}