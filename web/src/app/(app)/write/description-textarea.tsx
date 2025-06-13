"use client"

import { useRef, useEffect } from "react"

type DescriptionTextareaProps = {
    value?: string
    onChange: (value: string) => void
}

export function DescriptionTextarea({ value, onChange }: DescriptionTextareaProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto"
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
        }
    }, [value])

    return (
        <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Descrição curta sobre o seu artigo..."
            className="w-full text-muted-foreground leading-relaxed outline-none p-0 focus:ring-0 placeholder:text-gray-400 border-b resize-none overflow-hidden min-h-[100px]"
        />
    )
}