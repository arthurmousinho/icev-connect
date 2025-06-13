'use client'

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { UserBadge } from "@/components/user-badge";
import { Bookmark, Feather } from "lucide-react";
import { TopicIcon } from "@/components/topic-icon";
import { useState, useTransition } from "react";
import { addTopicToFavoriteAction, removeTopicFromFavoritesAction } from "./actions";
import { toast } from "sonner";
import { LikeButton } from "../../article/[slug]/like-button";
import type { TopicIconType } from "@/types/topic";

type TopicHeaderProps = {
    id: string;
    title: string;
    icon: TopicIconType;
    hasFavorite: boolean;
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

export function TopicHeader({
    id,
    title,
    icon,
    ranking,
    hasFavorite
}: TopicHeaderProps) {

    const [isPending, startTransition] = useTransition();

    const [favorite, setFavorite] = useState(hasFavorite);
    const [isAnimating, setIsAnimating] = useState(false);

    async function toggleFavorite() {
        const action = favorite ? removeTopicFromFavoritesAction : addTopicToFavoriteAction;
        const result = await action(id);

        if (result.success) {
            setFavorite(!favorite);
            toast.success(result.message);

            setIsAnimating(true);
            setTimeout(() => setIsAnimating(false), 200);

            return;
        }

        toast.error(result.message);
    }


    return (
        <header className="flex flex-col items-center justify-between gap-4 sticky top-20 w-[500px]">
            <div className="flex flex-col justify-start gap-2 w-full">
                <TopicIcon size={50} icon={icon} />
                <h1 className="font-bold text-2xl">
                    {title}
                </h1>
            </div>
            <nav className="space-y-2 w-full">
                <Button
                    variant="secondary"
                    className={`
                        w-full flex items-center gap-2 transition-transform duration-200 ease-out
                        ${isAnimating ? "scale-105" : "scale-100"}
                    `}
                    onClick={() => startTransition(toggleFavorite)}
                    disabled={isPending}
                >
                    <Bookmark
                        size={20}
                        className={favorite ? "text-primary fill-primary" : ""}
                    />
                    {favorite ? "Tópico Favoritado" : "Favoritar Tópico"}
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