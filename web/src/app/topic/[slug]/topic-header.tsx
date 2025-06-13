import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { UserBadge } from "@/components/user-badge";
import { Feather, Heart } from "lucide-react";
import { TopicIcon } from "@/components/topic-icon";
import type { TopicIconType } from "@/types/topic";
import { LikeButton } from "@/app/article/[slug]/like-button";

type TopicHeaderProps = {
    title: string;
    icon: TopicIconType;
    ranking: {
        position: number;
        user: {
            name: string;
            username: string;
            avatarUrl: string;
        },
        likesCount: number;
    }[]
}

export function TopicHeader({ title, icon, ranking }: TopicHeaderProps) {
    return (
        <header className="flex flex-col items-center justify-between gap-4 sticky top-20 w-[500px]">
            <div className="flex flex-col justify-start gap-2 w-full">
                <TopicIcon size={50} icon={icon} />
                <h1 className="font-bold text-2xl">
                    {title}
                </h1>
            </div>
            <nav className="space-y-2 w-full">
                <Button variant="secondary" className="w-full">
                    <Heart size={20} />
                    Favoritar Tópico
                </Button>
                <Button variant="secondary" className="w-full">
                    <Feather size={20} />
                    Escrever Sobre
                </Button>
            </nav>
            <Separator />
            <div className="w-full">
                <h2 className="text-sm text-muted-foreground uppercase">
                    Ranking de Colaboração
                </h2>
            </div>
            <div className="flex flex-col w-full gap-4">
                {ranking.map((item, index) => (
                    <Link
                        key={index}
                        href={`/user/${item.user.username}`}
                        className="flex items-center justify-between gap-2 w-full group"
                    >
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">
                                {item.position}º
                            </span>
                            <div className="group-hover:underline underline-offset-4">
                                <UserBadge
                                    name={item.user.name}
                                    avatarUrl={item.user.avatarUrl}
                                />
                            </div>
                        </div>
                        <LikeButton count={item.likesCount} />
                    </Link>
                ))}
            </div>
        </header>
    )
}