import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function UserBadge() {
    return (
        <div className="flex items-center gap-2">
            <Avatar className="size-6 rounded-sm">
                <AvatarFallback>JD</AvatarFallback>
                <AvatarImage src="https://github.com/arthurmousinho.png" />
            </Avatar>
            <span className="font-medium text-sm">John Doe</span>
        </div>
    )
}