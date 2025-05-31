import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { AlignLeft, Bot, Braces, Cpu, Database, DatabaseZap, EthernetPort, FileText, Gamepad2, Globe, Layers, ListChecks, Microchip, Monitor, Network, Smartphone } from "lucide-react"
import Link from "next/link"

const topics = [
    {
        title: "Todos",
        href: "/",
        isActive: true,
        icon: <AlignLeft size={20} />
    },
    {
        title: "Programação Web",
        href: "/topic/programacao-web",
        isActive: false,
        icon: <Globe size={20} />
    },
    {
        title: "Desenvolvimento Mobile",
        href: "/topic/desenvolvimento-mobile",
        isActive: false,
        icon: <Smartphone size={20} />
    },
    {
        title: "Inteligência Artificial",
        href: "/topic/inteligencia-artificial",
        isActive: false,
        icon: <Bot size={20} />
    },
    {
        title: "Desenvolvimento de Jogos",
        href: "/topic/desenvolvimento-de-jogos",
        isActive: false,
        icon: <Gamepad2 size={20} />
    },
    {
        title: "Estrutura de Dados",
        href: "/topic/estrutura-de-dados",
        isActive: false,
        icon: <Network size={20} />
    },
    {
        title: "Design & Arquitetura de Software",
        href: "/topic/design-e-arquitetura-de-software",
        isActive: false,
        icon: <Layers size={20} />
    },
    {
        title: "Sistemas Operacionais",
        href: "/topic/sistemas-operacionais",
        isActive: false,
        icon: <Monitor size={20} />
    },
    {
        title: "Redes e Sistemas Distribuídos",
        href: "/topic/redes-e-sistemas-distribuidos",
        isActive: false,
        icon: <EthernetPort size={20} />
    },
    {
        title: "Banco de Dados",
        href: "/topic/banco-de-dados",
        isActive: false,
        icon: <Database size={20} />
    },
    {
        title: "Requisitos e Modelagem de Software",
        href: "/topic/requisitos-e-modelagem-de-software",
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
        href: "/topic/internet-das-coisas",
        isActive: false,
        icon: <Microchip size={20} />
    },
    {
        title: "Algoritmos e Programação",
        href: "/topic/algoritmos-e-programacao",
        isActive: false,
        icon: <Braces size={20} />
    },
    {
        title: "Teste e Qualidade de Software",
        href: "/topic/teste-e-qualidade-de-software",
        isActive: false,
        icon: <ListChecks size={20} />
    },
    {
        title: "Arquitetura de computadores",
        href: "/topic/arquitetura-de-computadores",
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