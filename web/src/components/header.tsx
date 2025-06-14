import Link from "next/link";
import { Bookmark, Feather, Home, LetterText, TextSearch } from "lucide-react";
import { Logo } from "./logo";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { ProfileButton } from "./profile-button";

const links = [
    { href: "/", label: "Início", icon: <Home size={20} /> },
    { href: "/search", label: "Pesquisar", icon: <TextSearch size={20} /> },
    { href: "/write", label: "Escrever", icon: <Feather size={20} /> },
]

export function Header() {
    return (
        <header className="flex items-center justify-between p-4 bg-white shadow-md w-full">
            <Logo />
            <nav className="flex items-center gap-6">
                {links.map((link, index) => (
                    <Link
                        key={index}
                        href={link.href}
                        className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "flex items-center gap-2 text-gray-700 hover:bg-gray-100")}
                    >
                        {link.icon}
                        <span>{link.label}</span>
                    </Link>
                ))}
                <ProfileButton />
            </nav>
        </header>
    )
}