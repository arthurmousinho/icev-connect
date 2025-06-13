import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LogOut, Settings, Trash } from "lucide-react";
import { SettingField } from "./settings-field";
import { getUserProfileRequest } from "@/http/user/get-user-profile.http";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import StatusBadge from "@/components/status-badge";
import { UserRoleBadge } from "@/app/admin/users/user-role-badge";

export default async function SettingsPage() {

    const { data } = await getUserProfileRequest();

    return (
        <div className="flex flex-col h-dvh justify-top items-center w-full">
            <div className="w-full max-w-[1200px] flex flex-row items-start justify-center gap-10">
                <header className="flex flex-col items-center justify-between gap-4 sticky top-20 w-[500px]">
                    <div className="flex flex-col justify-start gap-2 w-full">
                        <Settings size={50} />
                        <h1 className="font-bold text-2xl">
                            Configurações
                        </h1>
                    </div>
                    <Separator />
                    <Button variant="secondary" className="w-full">
                        <LogOut />
                        Sair da conta
                    </Button>
                </header>
                <div className="flex flex-col w-full pb-10">
                    <header className="flex flex-row items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Avatar className="size-14">
                                <AvatarFallback className="text-lg font-semibold">
                                    {getInitials(data.name)}
                                </AvatarFallback>
                                <AvatarImage src={data.avatarUrl} />
                            </Avatar>
                            <div className="space-y-1">
                                <h2 className="text-xl font-semibold">{data.name}</h2>
                                <p className="text-sm text-gray-600">@{data.username}</p>
                            </div>
                        </div>
                        <Button variant="destructive">
                            <Trash />
                            Excluir conta
                        </Button>
                    </header>
                    <Separator className="my-6" />
                    <section className="space-y-3">
                        <p className="text-sm font-semibold text-muted-foreground">
                            Informações Pessoais
                        </p>
                        <div className="grid grid-cols-3">
                            <SettingField label="Nome completo" value={data.name} />
                            <SettingField label="Nome de usuário" value={data.username} />
                            <SettingField label="Email" value={data.email} />
                        </div>
                    </section>
                    <Separator className="my-6" />
                    <section className="space-y-3">
                        <p className="text-sm font-semibold text-muted-foreground">
                            Segurança da Conta
                        </p>
                        <div className="grid grid-cols-3">
                            <SettingField label="Cargo" value={<UserRoleBadge role={data.role} />} />
                            <SettingField
                                label="Status da Conta"
                                value={
                                    <StatusBadge variant={data.isActive ? "success" : "error"}>
                                        {data.isActive ? "Ativa" : "Inativa"}
                                    </StatusBadge>
                                }
                            />
                            <SettingField label="Modo de Autenticação" value={data.provider} />
                        </div>
                    </section>

                </div>
            </div>
        </div>
    )
}