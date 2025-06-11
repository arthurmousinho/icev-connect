import { TopicIconEnum } from "@/types/topic";
import {
    AlignLeft, ArrowUpRight, Bot, Braces, Cpu, Database, DatabaseZap,
    EthernetPort, FileText, Gamepad2, Globe, Layers, ListChecks,
    Microchip, Monitor, Network, Smartphone
} from "lucide-react"

export const topicIconMap: Record<TopicIconEnum, React.ElementType> = {
    DEFAULT: ArrowUpRight,
    ALIGN_LEFT: AlignLeft,
    BOT: Bot,
    BRACES: Braces,
    CPU: Cpu,
    DATABASE: Database,
    DATABASE_ZAP: DatabaseZap,
    ETHERNET_PORT: EthernetPort,
    FILE_TEXT: FileText,
    GAMEPAD_2: Gamepad2,
    GLOBE: Globe,
    LAYERS: Layers,
    LIST_CHECKS: ListChecks,
    MICROCHIP: Microchip,
    MONITOR: Monitor,
    NETWORK: Network,
    SMARTPHONE: Smartphone,
}

type TopicIconProps = {
    icon: keyof typeof TopicIconEnum;
    size?: number;
}

export function TopicIcon({ icon = 'DEFAULT', size = 20 }: TopicIconProps) {
    const IconComponent = topicIconMap[icon as TopicIconEnum] ?? topicIconMap.DEFAULT;
    return <IconComponent size={size} />;
}