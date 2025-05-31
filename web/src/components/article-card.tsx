import Link from "next/link";
import { UserBadge } from "./user-badge";
import { LikesBadge } from "./likes-badge";

export function ArticleCard() {
    return (
        <Link href="/article/article-slug-will-be-here" className="flex flex-col gap-3 group">
            <p className="text-sm font-semibold text-muted-foreground">
                Programação Web
            </p>
            <h3 className="text-2xl font-semibold text-balance group-hover:underline">
                Getting Started with Modern Web Development: A Complete Guide
            </h3>
            <p className="text-muted-foreground line-clamp-3 leading-relaxed">
                Dive into the fundamentals of modern web development. Learn about essential tools, frameworks, and best practices that will help you build robust and scalable web applications in today's fast-paced development environment.
            </p>
            <footer className="mt-3 flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                    <UserBadge />
                    <span className="text-muted-foreground">on March 15, 2024</span>
                </div>
                <LikesBadge count={42} />
            </footer>
        </Link >
    )
}
