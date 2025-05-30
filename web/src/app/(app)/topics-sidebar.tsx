import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { AlignLeft, Bot, Braces, Cpu, Database, DatabaseZap, EthernetPort, FileText, Gamepad2, Globe, Layers, ListChecks, Microchip, Monitor, Network, Smartphone } from "lucide-react"
import Link from "next/link"

const topics = [
    {
        title: "Todos",
        href: "",
        isActive: true,
        icon: <AlignLeft size={20} />
    },
    {
        title: "Programação Web",
        href: "#",
        isActive: false,
        icon: <Globe size={20} />
    },
    {
        title: "Desenvolvimento Mobile",
        href: "#",
        isActive: false,
        icon: <Smartphone size={20} />
    },
    {
        title: "Inteligência Artificial",
        href: "#",
        isActive: false,
        icon: <Bot size={20} />
    },
    {
        title: "Desenvolvimento de Jogos",
        href: "#",
        isActive: false,
        icon: <Gamepad2 size={20} />
    },
    {
        title: "Estrutura de Dados",
        href: "#",
        isActive: false,
        icon: <Network size={20} />
    },
    {
        title: "Design & Arquitetura de Software",
        href: "#",
        isActive: false,
        icon: <Layers size={20} />
    },
    {
        title: "Sistemas Operacionais",
        href: "#",
        isActive: false,
        icon: <Monitor size={20} />
    },
    {
        title: "Redes e Sistemas Distribuídos",
        href: "#",
        isActive: false,
        icon: <EthernetPort size={20} />
    },
    {
        title: "Banco de Dados",
        href: "#",
        isActive: false,
        icon: <Database size={20} />
    },
    {
        title: "Requisitos e Modelagem de Software",
        href: "#",
        isActive: false,
        icon: <FileText size={20} />
    },
    {
        title: "Ciência de Dados",
        href: "#",
        isActive: false,
        icon: <DatabaseZap size={20} />
    },
    {
        title: "Internet das Coisas",
        href: "#",
        isActive: false,
        icon: <Microchip size={20} />
    },
    {
        title: "Algoritmos e Programação",
        href: "#",
        isActive: false,
        icon: <Braces size={20} />
    },
    {
        title: "Teste e Qualidade de Software",
        href: "#",
        isActive: false,
        icon: <ListChecks size={20} />
    },
    {
        title: "Arquitetura de computadores",
        href: "#",
        isActive: false,
        icon: <Cpu size={20} />
    }
]

export function TopicsSidebar() {
    return (
        <aside className="flex flex-col gap-4 sticky top-20">
            {topics.map((topic, index) => (
                <Link
                    key={index}
                    href={topic.href}
                    className={cn(buttonVariants({ variant: "ghost", size: "sm" })) + " w-full flex justify-start" + (topic.isActive ? " bg-secondary text-secondary-foreground" : "")}
                >
                    {topic.icon}
                    {topic.title}
                </Link>
            ))}
        </aside>
    )
}