'use client'

import type React from "react"
import { cn } from "@/lib/utils"

interface StatusBadgeProps {
    variant: "success" | "warning" | "error"
    children: React.ReactNode
    className?: string
}

const variantStyles = {
    success: {
        dot: "bg-green-500",
        text: "text-gray-700",
    },
    warning: {
        dot: "bg-yellow-500",
        text: "text-gray-700",
    },
    error: {
        dot: "bg-red-500",
        text: "text-gray-700",
    },
}

export default function StatusBadge({ variant, children, className }: StatusBadgeProps) {
    const styles = variantStyles[variant]

    return (
        <div className={cn("flex items-center gap-2", className)}>
            <div className={cn("w-3 h-3 rounded-full", styles.dot)} />
            <span className={cn("text-sm text-muted-foreground font-medium", styles.text)}>{children}</span>
        </div>
    )
}
