'use client'

import { Heart } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { likeArticleAction, unlikeArticleAction } from "./actions";
import { useTransition, useState } from "react";

type LikesBadgeProps = {
    articleId: string;
    hasLiked: boolean;
    count: number;
};

export function LikeButton({ articleId, hasLiked: initialIsLiked, count: initialCount }: LikesBadgeProps) {

    const [isPending, startTransition] = useTransition();
    const [isLiked, setIsLiked] = useState(initialIsLiked);
    const [count, setCount] = useState(initialCount);

    const handleClick = () => {
        startTransition(async () => {
            if (isLiked) {
                const success = await unlikeArticleAction(articleId);
                if (success) {
                    setIsLiked(false);
                    setCount((prev) => prev - 1);
                }
            } else {
                const success = await likeArticleAction(articleId);
                if (success) {
                    setIsLiked(true);
                    setCount((prev) => prev + 1);
                }
            }
        });
    };

    return (
        <Button
            variant="ghost"
            size="sm"
            className="text-sm text-muted-foreground flex items-center gap-1"
            onClick={handleClick}
            disabled={isPending}
        >
            {isLiked ? <Heart className="fill-red-500 text-red-500" size={12} /> : <Heart size={12} />}
            {count}
        </Button>
    );
}