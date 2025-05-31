import { Hero } from "./hero";
import { TopicsSidebar } from "./topics-sidebar";
import { ArticleCard } from "@/components/article-card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function HomePage() {
    return (
        <main className="w-full flex flex-col gap-20 justify-center items-center mt-20 pb-20">
            <Hero />
            <div className="w-full max-w-[1200px] flex flex-row items-start justify-center gap-10">
                <TopicsSidebar />
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