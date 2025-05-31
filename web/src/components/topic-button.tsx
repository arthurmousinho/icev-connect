import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "./ui/button";


type TopicButtonProps = {
    title: string;
    href: string;
    isActive: boolean;
    icon: React.ReactNode;
}

export function TopicButton({
    title,
    href,
    isActive,
    icon,
}: TopicButtonProps) {
    return (
        <Link
            href={href}
            className={cn(buttonVariants({ variant: "ghost", size: "sm" }))
                + " w-full flex justify-start" + (isActive ? " bg-secondary text-secondary-foreground" : "")
            }
        >
            {icon}
            {title}
        </Link>
    )
}