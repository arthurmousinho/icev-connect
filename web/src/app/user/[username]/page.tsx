import { ArticleCard } from "@/components/article-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowDown } from "lucide-react";
import { Bot, Braces, Globe, ListChecks, Monitor } from "lucide-react"
import { TopicButton } from "@/components/topic-button";
import { findAllArticlesByUsernameRequest } from "@/http/articles/find-all-articles-by-username.http";
import { Header } from "@/components/header";
import { findUserByUsernameRequest } from "@/http/user/find-user-by-username.http";
import { getInitials } from "@/lib/utils";

const topics = [
    {
        title: "Programação Web",
        href: "/topic/programacao-web",
        isActive: false,
        icon: <Globe size={20} />
    },
    {
        title: "Inteligência Artificial",
        href: "/topic/inteligencia-artificial",
        isActive: false,
        icon: <Bot size={20} />
    },
    {
        title: "Algoritmos e Programação",
        href: "/topic/algoritmos-e-programacao",
        isActive: false,
        icon: <Braces size={20} />
    },
    {
        title: "Teste e Qualidade de Software",
        href: "/topic/teste-e-qualidade-de-software",
        isActive: false,
        icon: <ListChecks size={20} />
    },
]

type UserPageProps = {
    params: Promise<{ username: string }>;
}

export default async function UserPage({ params }: UserPageProps) {

    const { username } = await params;

    const [
        { data: userData },
        { data: userArticles }
    ] = await Promise.all([
        findUserByUsernameRequest(username),
        findAllArticlesByUsernameRequest(username)
    ]);

    return (
        <div className="flex flex-col h-dvh justify-top items-center gap-10">
            <Header />
            <div className="w-full max-w-[1200px] flex flex-row items-start justify-center gap-10">
                <header className="flex flex-col items-center justify-between gap-4 sticky top-20 w-[500px]">
                    <div className="flex flex-col justify-start gap-2 w-full">
                        <Avatar className="size-[100px] rounded-md">
                            <AvatarFallback>
                                {getInitials(userData.name)}
                            </AvatarFallback>
                            <AvatarImage src={userData.avatarUrl} />
                        </Avatar>
                        <h1 className="font-bold text-2xl">
                            {userData.name}
                        </h1>
                        <span className="text-muted-foreground text-sm italic">
                            @{userData.username}
                        </span>
                    </div>
                    <Separator />
                    <h2 className="text-sm text-muted-foreground uppercase w-full">
                        Tópicos de Interesse
                    </h2>
                    <div className="flex flex-col gap-4 w-full">
                        {/* {topics.map((topic, index) => (
                            <TopicButton
                                key={index}
                                title={topic.title}
                                icon={topic.icon}
                            />
                        ))} */}
                    </div>
                </header>
                <div className="flex flex-col w-full pb-10">
                    {userArticles.map(article => (
                        <div key={article.id}>
                            <ArticleCard
                                title={article.title}
                                description={article.description}
                                topicTitle={article.topic.title}
                                slug={article.slug}
                                authorAvatarUrl={article.author.avatarUrl}
                                authorName={article.author.name}
                                createdAt={article.createdAt}
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