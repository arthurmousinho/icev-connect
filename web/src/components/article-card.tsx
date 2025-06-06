import Link from "next/link";
import { UserBadge } from "./user-badge";
import { LikesBadge } from "./likes-badge";
import { formatDate } from "@/lib/utils";

type ArticleCardProps = {
    title: string;
    slug: string;
    description: string;
    authorName: string;
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
                <LikesBadge count={42} />
            </footer>
        </Link >
    )
}
