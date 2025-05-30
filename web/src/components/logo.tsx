import { Link2 } from "lucide-react";
import Link from "next/link";

export function Logo() {
    return (
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-primary hover:text-primary/80">
            <Link2 size={20} />
            <h1>iCEVConnect</h1>
        </Link>
    )
}