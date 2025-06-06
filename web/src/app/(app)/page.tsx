import { Hero } from "./hero";
import { ArticleCard } from "@/components/article-card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { AlignLeft, Bot, Braces, Cpu, Database, DatabaseZap, EthernetPort, FileText, Gamepad2, Globe, Layers, ListChecks, Microchip, Monitor, Network, Smartphone } from "lucide-react"
import { TopicButton } from "@/components/topic-button";
import { Header } from "@/components/header";
import { findAllTopicsRequest } from "@/http/topic/find-all-topics.http";

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

export default async function HomePage() {
    
    const { data } = await findAllTopicsRequest();

    return (
        <main className="w-full flex flex-col gap-20 justify-center items-center pb-20">
            <Header />
            <Hero />
            <div className="w-full max-w-[1200px] flex flex-row items-start justify-center gap-10">
                <aside className="flex flex-col gap-4 sticky top-20">
                    {data.map((topic, index) => (
                        <TopicButton
                            key={index}
                            title={topic.title}
                            slug={topic.slug}
                            isActive={false}
                            icon={topic.icon}
                        />
                    ))}
                </aside>
                <div className="flex flex-col w-full">
                    <ArticleCard />
                    <Separator className="my-6" />
                    <ArticleCard />
                    <Separator className="my-6" />
                    <ArticleCard />
                    <Separator className="my-6" />
                    <ArticleCard />
                    <footer className="flex justify-end mt-6">
                        <Button variant="secondary">
                            Ver todos
                            <ArrowRight size={20} />
                        </Button>
                    </footer>
                </div>
            </div>
        </main>
    )
}