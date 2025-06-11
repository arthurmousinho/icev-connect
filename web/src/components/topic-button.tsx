import type { TopicIconType } from "@/types/topic";
import { TopicIcon } from "./topic-icon";

type TopicButtonProps = {
    title: string;
    icon: TopicIconType;
}

export function TopicButton({
    title,
    icon = 'DEFAULT',
}: TopicButtonProps) {

    return (
        <div className="flex items-center gap-2 text-sm font-medium whitespace-nowrap overflow-hidden">
            <TopicIcon icon={icon} size={20} />
            <span className="truncate">{title}</span>
        </div>
    )
}