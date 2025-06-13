import { ArticleForm } from "./article-form";

export default function WriteArticlePage() {
    return (
        <div className="w-full flex flex-col h-dvh justify-top items-center">
            <main className="w-full max-w-[800px] space-y-4">
                <ArticleForm />
            </main>
        </div>
    )
}