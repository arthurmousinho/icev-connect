import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { formatDate } from "@/lib/utils"
import { Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { UserBadge } from "@/components/user-badge"
import { Kbd } from "@/components/kbd"
import type { TopicIconType } from "@/types/topic"
import { TopicButton } from "@/components/topic-button"

type Props = {
    data: {
        id: string;
        title: string;
        slug: string;
        description: string;
        likesCount: number;
        author: {
            name: string;
            email: string;
            avatarUrl: string;
        },
        topic: {
            icon: TopicIconType;
            title: string;
        }
        createdAt: string;
        updatedAt: string;
    },
}

export function ArticleDetailsSheet({ data }: Props) {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button size="icon" variant="outline">
                    <Eye />
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xl overflow-y-auto">
                <SheetHeader>
                    <SheetTitle>Detalhes do Artigo</SheetTitle>
                </SheetHeader>
                <main className="px-4 space-y-6">
                    <div className="space-y-2">
                        <Label>Id:</Label>
                        <Kbd>
                            {data.id}
                        </Kbd>
                    </div>
                    <div className="space-y-2">
                        <Label>Slug:</Label>
                        <Kbd>
                            {data.slug}
                        </Kbd>
                    </div>
                    <div className="space-y-2">
                        <Label>Título:</Label>
                        <span className="text-sm text-muted-foreground">
                            {data.title}
                        </span>
                    </div>
                    <div className="space-y-2">
                        <Label>Descrição:</Label>
                        <span className="text-sm text-muted-foreground">
                            {data.description}
                        </span>
                    </div>
                    <div className="space-y-2">
                        <Label>Tópico:</Label>
                        <TopicButton
                            title={data.topic.title}
                            icon={data.topic.icon}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Autor:</Label>
                        <UserBadge
                            name={data.author.name}
                            avatarUrl={data.author.avatarUrl}
                            email={data.author.email}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Curtidas:</Label>
                        <span className="text-sm text-muted-foreground">
                            {data.likesCount} curtidas
                        </span>
                    </div>
                    <div>
                        <Label>Data de Criação</Label>
                        <span className="text-sm text-muted-foreground">
                            {formatDate(data.createdAt, true)}
                        </span>
                    </div>
                    <div className="space-y-2">
                        <Label>Data de Atualização</Label>
                        <span className="text-sm text-muted-foreground">
                            {formatDate(data.updatedAt, true)}
                        </span>
                    </div>
                </main>
            </SheetContent>
        </Sheet>
    );
}