import { ArticleCard } from "@/components/article-card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ArrowDown, ArrowUp, Heart, Search, TextSearch } from "lucide-react"
import { Input } from "@/components/ui/input"
import { findAllTopicsRequest } from "@/http/topic/find-all-topics.http"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default async function SeachPage() {

    const { data: topics } = await findAllTopicsRequest()

    return (
        <div className="flex flex-col h-dvh justify-top items-center w-full">
            <div className="w-full max-w-[1200px] flex flex-row items-start justify-center gap-10">
                <header className="flex flex-col items-center justify-between gap-4 sticky top-20 w-[500px]">
                    <div className="flex flex-col justify-start gap-2 w-full">
                        <TextSearch size={50} />
                        <h1 className="font-bold text-2xl">Buscar Artigos</h1>
                    </div>
                    <form className="w-full space-y-2">
                        <Input type="search" placeholder="Buscar por título, descrição, autor..." className="w-full" />
                        <Button variant="secondary" className="w-full">
                            <Search size={20} />
                            Buscar
                        </Button>
                    </form>
                    <Separator />
                    <h2 className="text-sm text-muted-foreground uppercase w-full text-left">Filtro por Tópico</h2>
                    <div className="w-full space-y-4">
                        {topics.map((topic) => (
                            <div key={topic.id} className="flex flex-row items-center gap-2">
                                <Checkbox />
                                <label className="text-sm">{topic.title}</label>
                            </div>
                        ))}
                    </div>
                </header>
                <div className="flex flex-col w-full pb-10">
                    <header className="flex items-center justify-between">
                        <div className="flex flex-row items-center gap-2">
                            <Search size={20} />
                            <p className="text-sm font-medium">
                                <span className="font-bold">56</span> resultados encontrados
                            </p>
                        </div>
                        <Select>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Ordernar por" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="relevance">
                                    <Heart />
                                    Relevância
                                </SelectItem>
                                <SelectItem value="recent">
                                    <ArrowUp />
                                    Mais recente
                                </SelectItem>
                                <SelectItem value="older">
                                    <ArrowDown />
                                    Mais antigo
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </header>
                    {/* <Separator className="my-6" />
                    <ArticleCard />
                    <Separator className="my-6" />
                    <ArticleCard />
                    <Separator className="my-6" />
                    <ArticleCard />
                    <Separator className="my-6" />
                    <ArticleCard /> */}
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
