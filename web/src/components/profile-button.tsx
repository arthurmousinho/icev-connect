import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, UserRound } from "lucide-react";
import Link from "next/link";

export async function ProfileButton() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-2 cursor-pointer">
                    <Avatar>
                        <AvatarFallback>AM</AvatarFallback>
                        <AvatarImage src="https://github.com/arthurmousinho.png" />
                    </Avatar>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                <div className="flex flex-col items-start p-2">
                    <span className="font-medium text-sm">
                        Arthur Mousinho
                    </span>
                    <span className="text-muted-foreground text-xs">
                        arthurmousinho@icev.com
                    </span>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Link href="/me" className="flex flex-row items-center gap-2">
                        <UserRound className="size-4" />
                        <span>Meu Perfil</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <a href="/auth/signout" className="flex flex-row items-center text-destructive w-full h-full">
                        <LogOut className="mr-2 h-4 w-4 text-destructive" />
                        Sair
                    </a>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}