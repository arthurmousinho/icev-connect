import { Hero } from "./hero";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { AlignLeft, Bot, Braces, Cpu, Database, DatabaseZap, EthernetPort, FileText, Gamepad2, Globe, Layers, ListChecks, Microchip, Monitor, Network, Smartphone } from "lucide-react"
import { TopicButton } from "@/components/topic-button";
import { findAllTopicsRequest } from "@/http/topic/find-all-topics.http";
import { searchArticlesRequest } from "@/http/articles/search-articles.http";
import { ArticleCard } from "@/components/article-card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { cn } from "@/lib/utils";

const topics = [
    {
        title: "Todos",
        href: "/",
        isActive: true,
        icon: <AlignLeft size={20} />
    },
    {
        title: "Programação Web",
        href: "/topic/programacao-web",
        isActive: false,
        icon: <Globe size={20} />
    },
    {
        title: "Desenvolvimento Mobile",
        href: "/topic/desenvolvimento-mobile",
        isActive: false,
        icon: <Smartphone size={20} />
    },
    {
        title: "Inteligência Artificial",
        href: "/topic/inteligencia-artificial",
        isActive: false,
        icon: <Bot size={20} />
    },
    {
        title: "Desenvolvimento de Jogos",
        href: "/topic/desenvolvimento-de-jogos",
        isActive: false,
        icon: <Gamepad2 size={20} />
    },
    {
        title: "Estrutura de Dados",
        href: "/topic/estrutura-de-dados",
        isActive: false,
        icon: <Network size={20} />
    },
    {
        title: "Design & Arquitetura de Software",
        href: "/topic/design-e-arquitetura-de-software",
        isActive: false,
        icon: <Layers size={20} />
    },
    {
        title: "Sistemas Operacionais",
        href: "/topic/sistemas-operacionais",
        isActive: false,
        icon: <Monitor size={20} />
    },
    {
        title: "Redes e Sistemas Distribuídos",
        href: "/topic/redes-e-sistemas-distribuidos",
        isActive: false,
        icon: <EthernetPort size={20} />
    },
    {
        title: "Banco de Dados",
        href: "/topic/banco-de-dados",
        isActive: false,
        icon: <Database size={20} />
    },
    {
        title: "Requisitos e Modelagem de Software",
        href: "/topic/requisitos-e-modelagem-de-software",
        isActive: false,
        icon: <FileText size={20} />
    },
    {
        title: "Ciência de Dados",
        href: "#",
        isActive: false,
        icon: <DatabaseZap size={20} />
    },
    {
        title: "Internet das Coisas",
        href: "/topic/internet-das-coisas",
        isActive: false,
        icon: <Microchip size={20} />
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
    {
        title: "Arquitetura de computadores",
        href: "/topic/arquitetura-de-computadores",
        isActive: false,
        icon: <Cpu size={20} />
    }
]

type HomePageProps = {
    searchParams: Promise<{ topic?: string }>;
};

export default async function HomePage({ searchParams }: HomePageProps) {

    const { topic: topicFromParams } = await searchParams

    const [
        { data: topics },
        { data: articles }
    ] = await Promise.all([
        findAllTopicsRequest(),
        searchArticlesRequest(
            {
                topicSlugs: topicFromParams ? [topicFromParams] : [],
                orderBy: 'relevance',
            },
            {
                page: 1,
                limit: 3
            }
        ),
    ])

    return (
        <main className="w-full flex flex-col gap-20 justify-center items-center mt-10">
            <Hero />
            <div className="w-full max-w-[1200px] flex flex-row items-start justify-center gap-10">
                <aside className="flex flex-col gap-2 sticky top-20">
                    <Link
                        href="/"
                        className={cn(
                            buttonVariants({ variant: !topicFromParams ? 'secondary' : 'ghost' }),
                            "flex justify-start normal-case"
                        )}
                    >
                        <TopicButton
                            title="Todos"
                            icon="DEFAULT"
                        />
                    </Link>

                    {topics.map((topic) => (
                        <Link
                            key={topic.id}
                            href={`/?topic=${topic.slug}`}
                            className={cn(
                                buttonVariants({ variant: topicFromParams === topic.slug ? 'secondary' : 'ghost' }),
                                "flex justify-start normal-case"
                            )}
                        >
                            <TopicButton
                                title={topic.title}
                                icon={topic.icon}
                            />
                        </Link>
                    ))}
                </aside>
                <div className="flex flex-col w-full">
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
                    {topicFromParams && (
                        <footer className="flex justify-end mt-6">
                            <Link
                                href={`/topic/${topicFromParams}`}
                                className={cn(buttonVariants({ variant: 'secondary' }))}
                            >
                                Ver Mais
                                <ArrowRight size={20} />
                            </Link>
                        </footer>
                    )}
                </div>
            </div>
        </main>
    )
}