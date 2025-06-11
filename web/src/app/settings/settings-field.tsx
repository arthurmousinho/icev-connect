import type { ReactNode } from "react";

type SettingFieldProps = {
    label: string;
    value: string | ReactNode;
}

export function SettingField({ label, value }: SettingFieldProps) {
    return (
        <div className="flex flex-col gap-2">
            <label className="font-medium">
                {label}:
            </label>
            <span className="text-muted-foreground">
                {value}
            </span>
        </div>
    )
}