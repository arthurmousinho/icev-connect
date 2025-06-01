import { Separator } from "@/components/ui/separator";
import { CircleX } from "lucide-react";

type AuthErrorPageProps = {
    searchParams: {
        message?: string;
    };
}

export default async function GoogleOAuthErrorPage({ searchParams }: AuthErrorPageProps) {

    const errorMessage = searchParams.message ?? 'Ocorreu um erro desconhecido.';

    return (
        <div className="flex flex-col h-dvh justify-center">
            <main className="mx-auto">
                <header className="flex flex-row items-center gap-2">
                    <CircleX className="text-destructive" />
                    <h1 className="font-semibold">
                        Ocorreu um erro ao autenticar com o Google
                    </h1>
                </header>
                <Separator className="my-4" />
                <p className="text-muted-foreground">
                    {errorMessage}
                </p>
            </main>
        </div>
    );
}
