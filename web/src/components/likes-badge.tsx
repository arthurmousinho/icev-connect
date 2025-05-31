import { Heart } from "lucide-react";

type LikesBadgeProps = {
    count?: number;
}

export function LikesBadge({ count = 0 }: LikesBadgeProps) {
    return (
        <p className="text-sm text-muted-foreground flex items-center gap-1">
            <Heart size={12} />
            {count}
        </p>
    )
}