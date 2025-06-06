import { Header } from "@/components/header"
import { ArticleEditor } from "./editor";
import { TitleTextarea } from "./title-textarea";
import { DescriptionTextarea } from "./description-textarea";
import { TopicSelect } from "./topic-select";

export default function WriteArticlePage() {
    return (
        <div className="flex flex-col h-dvh justify-top items-center gap-10">
            <Header />
            <main className="w-full max-w-[800px] space-y-4 pb-10">
                <div className="w-[180px]">
                    <TopicSelect />
                </div>
                <TitleTextarea />
                <DescriptionTextarea />
                <ArticleEditor />
            </main>
        </div>
    )
}