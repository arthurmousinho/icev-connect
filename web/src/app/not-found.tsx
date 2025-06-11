import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ArrowLeft, SearchX } from "lucide-react";
import Link from "next/link";

export default function NotFoundPage() {
    return (
        <div className="flex flex-col h-dvh justify-center">
            <main className="mx-auto space-y-4">
                <header className="flex flex-row items-center gap-2">
                    <SearchX className="text-destructive" />
                    <h1 className="font-semibold">
                        Essa página não foi encontrada
                    </h1>
                </header>
                <Separator />
                <p className="text-muted-foreground">
                    A página que você está procurando não existe ou foi movida.
                </p>
                <Link href="/" className={cn(buttonVariants({ variant: 'outline' }))}>
                    <ArrowLeft />
                    Voltar ao Início
                </Link>
            </main>
        </div>
    );
}
