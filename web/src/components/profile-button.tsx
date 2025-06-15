import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, Settings, UserRound } from "lucide-react";
import { getUserProfileRequest } from "@/http/user/get-user-profile.http";
import { getInitials } from "@/lib/utils";

export async function ProfileButton() {

    const { data } = await getUserProfileRequest();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-2 cursor-pointer">
                    <Avatar>
                        <AvatarFallback>
                            {getInitials(data.name)}
                        </AvatarFallback>
                        <AvatarImage src={data.avatarUrl} />
                    </Avatar>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                <div className="flex flex-col items-start p-2 gap-1">
                    <span className="font-medium text-sm">
                        {data.name}
                    </span>
                    <span className="text-muted-foreground text-xs">
                        {data.email}
                    </span>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Link
                        href={`/user/${data.username}`}
                        className="w-full flex flex-row items-center gap-2"
                    >
                        <UserRound className="size-4" />
                        <span>Meu Perfil</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link
                        href="/settings"
                        className="w-full flex flex-row items-center gap-2"
                    >
                        <Settings className="size-4" />
                        <span>Configurações</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <a
                        href="/auth/signout"
                        className="w-full flex flex-row items-center text-destructive h-full"
                    >
                        <LogOut className="mr-2 h-4 w-4 text-destructive" />
                        Sair
                    </a>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}