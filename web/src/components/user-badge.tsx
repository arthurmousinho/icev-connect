import { getInitials } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

type UserBadgeProps = {
    name: string;
    avatarUrl: string;
}

export function UserBadge({ name, avatarUrl }: UserBadgeProps) {
    return (
        <div className="flex items-center gap-2">
            <Avatar className="size-6 rounded-sm">
                <AvatarFallback>{getInitials(name)}</AvatarFallback>
                <AvatarImage src={avatarUrl} />
            </Avatar>
            <span className="font-medium text-sm">
                {name}
            </span>
        </div >
    )
}