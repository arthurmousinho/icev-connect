import { ArticleCard } from "@/components/article-card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowDown } from "lucide-react";
import { TopicHeader } from "./topic-header";
import { Header } from "@/components/header";

export default function TopicPage() {
    return (
        <div className="flex flex-col h-dvh justify-top items-center gap-10">
            <Header />
            <div className="w-full max-w-[1200px] flex flex-row items-start justify-center gap-10">
                <TopicHeader />
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