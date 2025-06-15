import { getInitials } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

type UserBadgeProps = {
    name: string;
    email?: string;
    avatarUrl: string;
}

export function UserBadge({ name, email, avatarUrl }: UserBadgeProps) {
    return (
        <div className="flex items-center gap-2">
            <Avatar className={`${email ? 'size-8' : 'size-6'} rounded-sm`}>
                <AvatarFallback>{getInitials(name)}</AvatarFallback>
                <AvatarImage src={avatarUrl} />
            </Avatar>
            <div className="flex flex-col leading-tight">
                <span className="font-medium text-sm">{name}</span>
                {email && (
                    <span className="text-xs text-muted-foreground">{email}</span>
                )}
            </div>
        </div>
    );
}