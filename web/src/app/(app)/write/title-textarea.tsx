"use client"

import { useRef, useEffect } from "react"

type TitleTextareaProps = {
    value?: string
    onChange: (value: string) => void
}

export function TitleTextarea({ value, onChange }: TitleTextareaProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "50px"
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
        }
    }, [value])

    return (
        <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Título do artigo"
            className="w-full text-4xl font-bold tracking-tight border-none outline-none p-0 focus:ring-0 placeholder:text-gray-400 resize-none overflow-hidden leading-tight h-[50px]"
        />
    )
}