"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSidebar } from "@/components/ui/sidebar"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import {
    Github,
    UsersRound,
    Gauge,
    Pin,
    LetterText,
    Server,
    X,
} from "lucide-react"
import { Logo } from "@/components/logo"

const sidebarConfig = [
    {
        label: "Administrativo",
        items: [
            { label: "Dashboard", href: "/admin", icon: Gauge },
            { label: "Usuários", href: "/admin/users", icon: UsersRound },
            { label: "Tópicos", href: "/admin/topics", icon: Pin },
            { label: "Artigos", href: "/admin/articles", icon: LetterText },
        ],
    },
    {
        label: "Infraestrutura",
        items: [
            { label: "API", href: "/admin", icon: Server },
            { label: "Repositório", href: "/admin", icon: Github },
        ],
    },
]

export function AdminSidebar() {

    const pathname = usePathname();

    const { isMobile, toggleSidebar } = useSidebar();

    return (
        <Sidebar variant="floating" collapsible="icon">
            <SidebarHeader className="flex items-start flex-row justify-between p-4 group-data-[collapsible=icon]:hidden">
                <Logo />
                {isMobile && (
                    <Button variant="ghost" size="icon" onClick={toggleSidebar} className="h-8 w-8 lg:hidden">
                        <X className="h-5 w-5" />
                        <span className="sr-only">Fechar</span>
                    </Button>
                )}
            </SidebarHeader>

            <SidebarContent className="scrollbar-hide">
                {sidebarConfig.map((group) => (
                    <SidebarGroup key={group.label}>
                        <SidebarGroupLabel>{group.label.toUpperCase()}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {group.items.map(({ label, href, icon: Icon }, index) => (
                                    <SidebarMenuItem key={index}>
                                        <SidebarMenuButton asChild isActive={pathname === href} tooltip={label}>
                                            <Link href={href} onClick={isMobile ? toggleSidebar : undefined}>
                                                <Icon />
                                                <span>{label}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
        </Sidebar>
    )
}