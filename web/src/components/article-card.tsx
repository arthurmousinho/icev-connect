import Link from "next/link";
import { UserBadge } from "./user-badge";
import { formatDate } from "@/lib/utils";
import { LikeButton } from "@/app/(app)/article/[slug]/like-button";

type ArticleCardProps = {
    title: string;
    slug: string;
    description: string;
    authorName: string;
    likesCount: number;
    authorAvatarUrl: string;
    topicTitle: string;
    createdAt: string;
}

export function ArticleCard({
    title,
    slug,
    description,
    authorName,
    authorAvatarUrl,
    topicTitle,
    createdAt,
    likesCount
}: ArticleCardProps) {
    return (
        <Link href={`/article/${slug}`} className="flex flex-col gap-3 group">
            <p className="text-sm font-semibold text-muted-foreground">
                {topicTitle}
            </p>
            <h3 className="text-2xl font-semibold text-balance group-hover:underline">
                {title}
            </h3>
            <p className="text-muted-foreground line-clamp-3 leading-relaxed">
                {description}
            </p>
            <footer className="mt-3 flex flex-row items-center justify-between">
                <div className="flex items-center gap-1">
                    <UserBadge
                        name={authorName}
                        avatarUrl={authorAvatarUrl}
                    />
                    <span className="text-muted-foreground">
                        em {formatDate(createdAt)}
                    </span>
                </div>
                <LikeButton
                    count={likesCount}
                    hasLiked={false}
                    articleId={""}
                />
            </footer>
        </Link >
    )
}
