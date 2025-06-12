'use client'

import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { likeArticleAction, unlikeArticleAction } from "./actions";
import { useTransition, useState } from "react";
import { toast } from "sonner";

type LikeButtonProps = {
    articleId: string;
    hasLiked: boolean;
    count: number;
};

export function LikeButton({ articleId, hasLiked, count }: LikeButtonProps) {

    const [isPending, startTransition] = useTransition();

    const [liked, setLiked] = useState(hasLiked);
    const [likesCount, setLikesCount] = useState(count);
    const [isAnimating, setIsAnimating] = useState(false);

    const toggleLike = async () => {
        const action = liked ? unlikeArticleAction : likeArticleAction;
        const result = await action(articleId);

        if (result.success) {
            setLiked(!liked);
            setLikesCount(prev => prev + (liked ? -1 : 1));
            toast(result.message);

            setIsAnimating(true);
            setTimeout(() => setIsAnimating(false), 200); 
            return;
        }

        toast(result.message);
    };

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={() => startTransition(toggleLike)}
            disabled={isPending}
            className="text-sm text-muted-foreground flex items-center gap-1"
        >
            <Heart
                size={12}
                className={`
                    transition-transform duration-200 ease-out
                    ${liked ? "fill-red-500 text-red-500" : ""}
                    ${isAnimating ? "scale-125" : "scale-100"}
                `}
            />
            {likesCount}
        </Button>
    );
}