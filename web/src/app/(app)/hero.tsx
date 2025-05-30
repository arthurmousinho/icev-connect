import { Badge } from "@/components/ui/badge";

export function Hero() {
    return (
        <section className="w-[900px] flex flex-col items-center justify-center text-center">
            <Badge variant="secondary" className="font-medium">
                Olá, Bem-vindo
            </Badge>
            <div className="space-y-4 mt-2">
                <h1 className="text-[58px] font-bold tracking-tight leading-tight">
                    Aprenda, compartilhe e cresça com a comunidade iCEV.
                </h1>
                <p className="text-muted-foreground leading-relaxed balanced">
                    Uma plataforma feita para alunos do iCEV compartilharem conhecimento e crescerem juntos na jornada da engenharia de software. Participe, publique e aprenda
                </p>
            </div>
        </section>
    )
}