import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { AlignLeft, ArrowUpRight, Bot, Braces, Cpu, Database, DatabaseZap, EthernetPort, FileText, Gamepad2, Globe, Layers, ListChecks, Microchip, Monitor, Network, Smartphone } from "lucide-react"

export enum TopicIcon {
    DEFAULT = 'DEFAULT',
    ALIGN_LEFT = 'ALIGN_LEFT',
    BOT = 'BOT',
    BRACES = 'BRACES',
    CPU = 'CPU',
    DATABASE = 'DATABASE',
    DATABASE_ZAP = 'DATABASE_ZAP',
    ETHERNET_PORT = 'ETHERNET_PORT',
    FILE_TEXT = 'FILE_TEXT',
    GAMEPAD_2 = 'GAMEPAD_2',
    GLOBE = 'GLOBE',
    LAYERS = 'LAYERS',
    LIST_CHECKS = 'LIST_CHECKS',
    MICROCHIP = 'MICROCHIP',
    MONITOR = 'MONITOR',
    NETWORK = 'NETWORK',
    SMARTPHONE = 'SMARTPHONE',
}

export const topicIconMap: Record<TopicIcon, React.ReactNode> = {
    DEFAULT: <ArrowUpRight />,
    ALIGN_LEFT: <AlignLeft />,
    BOT: <Bot />,
    BRACES: <Braces />,
    CPU: <Cpu />,
    DATABASE: <Database />,
    DATABASE_ZAP: <DatabaseZap />,
    ETHERNET_PORT: <EthernetPort />,
    FILE_TEXT: <FileText />,
    GAMEPAD_2: <Gamepad2 />,
    GLOBE: <Globe />,
    LAYERS: <Layers />,
    LIST_CHECKS: <ListChecks />,
    MICROCHIP: <Microchip />,
    MONITOR: <Monitor />,
    NETWORK: <Network />,
    SMARTPHONE: <Smartphone />,
};

type TopicButtonProps = {
    title: string;
    slug: string;
    isActive: boolean;
    icon: TopicIcon;
}

export function TopicButton({
    title,
    slug,
    isActive,
    icon = TopicIcon.DEFAULT,
}: TopicButtonProps) {

    return (
        <Link
            href={`/topic/${slug}`}
            className={cn(buttonVariants({ variant: "ghost", size: "sm" }))
                + " w-full flex justify-start" + (isActive ? " bg-secondary text-secondary-foreground" : "")
            }
        >
            {topicIconMap[icon]}
            {title}
        </Link>
    )
}