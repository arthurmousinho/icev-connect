import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { UserBadge } from "@/components/user-badge";
import { Feather, Gamepad2, Heart } from "lucide-react";
import { LikesBadge } from "@/components/likes-badge";

export function TopicHeader() {
    return (
        <header className="flex flex-col items-center justify-between gap-4 sticky top-20 w-[500px]">
            <div className="flex flex-col justify-start gap-2 w-full">
                <Gamepad2 size={50} />
                <h1 className="font-bold text-2xl">
                    Desenvolvimento de Jogos
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
                <Link href="/user/username" className="flex items-center justify-between gap-2 w-full group">
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                            1º
                        </span>
                        <div className="group-hover:underline underline-offset-4">
                            <UserBadge />
                        </div>
                    </div>
                    <LikesBadge count={34} />
                </Link>
                <Link href="/user/username" className="flex items-center justify-between gap-2 w-full group">
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                            2º
                        </span>
                        <div className="group-hover:underline underline-offset-4">
                            <UserBadge />
                        </div>
                    </div>
                    <LikesBadge count={34} />
                </Link>
                <Link href="/user/username" className="flex items-center justify-between gap-2 w-full group">
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                            3º
                        </span>
                        <div className="group-hover:underline underline-offset-4">
                            <UserBadge />
                        </div>
                    </div>
                    <LikesBadge count={34} />
                </Link>
            </div>
        </header>
    )
}