'use client'

import { useRef, useState, useEffect } from "react";

export function TitleTextarea() {
    const [value, setValue] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "50"; 
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [value]);

    return (
        <textarea
            id="title"
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Título do artigo"
            className="w-full text-4xl font-bold tracking-tight border-none outline-none p-0 focus:ring-0 placeholder:text-gray-400 resize-none overflow-hidden leading-tight h-[50px]"
        />
    );
}