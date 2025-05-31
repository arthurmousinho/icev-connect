import { ArticleCard } from "@/components/article-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowDown } from "lucide-react";
import { Bot, Braces, Globe, ListChecks, Monitor } from "lucide-react"
import { TopicButton } from "@/components/topic-button";

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

export default function UserPage() {
    return (
        <div className="flex flex-col h-dvh justify-top items-center mt-10">
            <div className="w-full max-w-[1200px] flex flex-row items-start justify-center gap-10">
                <header className="flex flex-col items-center justify-between gap-4 sticky top-20 w-[500px]">
                    <div className="flex flex-col justify-start gap-2 w-full">
                        <Avatar className="size-[100px] rounded-md">
                            <AvatarFallback>JD</AvatarFallback>
                            <AvatarImage src="https://github.com/arthurmousinho.png" />
                        </Avatar>
                        <h1 className="font-bold text-2xl">
                            Arthur Mousinho
                        </h1>
                        <span className="text-muted-foreground text-sm italic">
                            @arthurmousinho
                        </span>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, saepe possimus labore sequi beatae culpa omnis at excepturi rerum asperiores corrupti id, harum ea ex cupiditate aut suscipit nihil accusamus?
                    </p>
                    <Separator />
                    <h2 className="text-sm text-muted-foreground uppercase w-full">
                        Tópicos de Interesse
                    </h2>
                    <div className="flex flex-col gap-4 w-full">
                        {topics.map((topic, index) => (
                            <TopicButton
                                key={index}
                                title={topic.title}
                                href={topic.href}
                                isActive={topic.isActive}
                                icon={topic.icon}
                            />
                        ))}
                    </div>
                </header>
                <div className="flex flex-col w-full pb-10">
                    <ArticleCard />
                    <Separator className="my-6" />
                    <ArticleCard />
                    <Separator className="my-6" />
                    <ArticleCard />
                    <Separator className="my-6" />
                    <ArticleCard />
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