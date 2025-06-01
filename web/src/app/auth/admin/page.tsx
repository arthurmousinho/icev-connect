import { Logo } from "@/components/logo";
import { LoginForm } from "./login-form";

export default function AdminLoginPage() {
    return (
        <div className="flex flex-col h-screen items-center justify-center gap-4">
            <div className="w-[400px] space-y-4">
                <Logo />
                <LoginForm />
            </div>
        </div>
    )
}