import { Header } from "@/components/header"
import { ArticleForm } from "./article-form";

export default function WriteArticlePage() {
    return (
        <div className="flex flex-col h-dvh justify-top items-center gap-10">
            <Header />
            <main className="w-full max-w-[800px] space-y-4 pb-10">
                <ArticleForm />
            </main>
        </div>
    )
}