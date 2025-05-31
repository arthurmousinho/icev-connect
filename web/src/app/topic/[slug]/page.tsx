import { ArticleCard } from "@/components/article-card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowDown, ArrowLeft, Gamepad2 } from "lucide-react";

export default function TopicPage() {
    return (
        <div className="flex flex-col h-dvh justify-top items-center mt-10">
            <main className="w-full max-w-[1200px] space-y-10 pb-10">
                <header>
                    <div className="flex flex-row items-center justify-between">
                        <div className="flex flex-row items-center gap-2">
                            <Gamepad2 size={30} />
                            <h1 className="font-bold text-2xl">
                                Desenvolvimento de Jogos
                            </h1>
                        </div>
                        <Button variant="secondary">
                            <ArrowLeft size={20} />
                            Voltar
                        </Button>
                    </div>
                    <Separator className="my-4" />
                </header>
                <div className="grid grid-cols-2 gap-8">
                    <ArticleCard />
                    <ArticleCard />
                    <ArticleCard />
                    <ArticleCard />
                    <ArticleCard />
                    <ArticleCard />
                    <ArticleCard />
                    <footer className="flex justify-end mt-6 col-span-2">
                        <Button variant="secondary">
                            Carregar mais
                            <ArrowDown size={20} />
                        </Button>
                    </footer>
                </div>
            </main>
        </div>
    )
}