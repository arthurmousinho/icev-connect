import Google from "@/components/google-icon";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

export default function AuthPage() {
    return (
        <div className="flex flex-col h-screen items-center justify-center gap-4">
            <Logo />
            <Button variant="outline">
                <Google />
                Fazer login com e-mail institucional
            </Button>
        </div>
    )
}