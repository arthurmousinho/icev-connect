'use client';

import { Separator } from "@/components/ui/separator";
import { Loader } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { saveTokenAction } from "../actions";

export default function GoogleOAuthCallbackPage() {

    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const router = useRouter();

    useEffect(() => {
        handleAuthentication(token);
    }, [token])

    async function handleAuthentication(token: string | null) {
        if (!token) {
            return;
        }

        await saveTokenAction(token);
        router.push('/');
    }

    return (
        <div className="flex flex-col h-dvh justify-center">
            <main className="mx-auto">
                <header className="flex flex-row items-center gap-2">
                    <Loader className="animate-spin font-semibold" />
                    <h1 className="font-semibold">
                        Processando autenticação com o Google
                    </h1>
                </header>
                <Separator className="my-4" />
                <p className="text-muted-foreground">
                    {token ? (
                        <>
                            Autenticação concluída com sucesso!
                        </>
                    ) : (
                        <>
                            Você será redirecionado em breve. Se não for,{" "}
                            <a href="/" className="text-blue-500 hover:underline">
                                clique aqui.
                            </a>
                        </>
                    )}
                </p>
            </main>
        </div>
    );
}
