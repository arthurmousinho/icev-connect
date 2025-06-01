import type { UserRole } from "@/types/user";
import { Badge } from "@/components/ui/badge";
import { Lock, UserRound } from "lucide-react";

type UserRoleBadgeProps = {
    role: UserRole;
}

export function UserRoleBadge({ role }: UserRoleBadgeProps) {

    const map: Record<UserRole, string> = {
        'USER': 'Usuário',
        'ADMIN': 'Administrador'
    }

    const iconMap: Record<UserRole, React.ReactNode> = {
        'USER': <UserRound />,
        'ADMIN': <Lock />
    }

    return (
        <Badge variant="outline" className="space-x-4">
            {iconMap[role]}
            {map[role]}
        </Badge>
    )

}