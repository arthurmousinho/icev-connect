"use client"

import "@/styles/markdown.css"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

export function ArticleEditor() {
    const [content, setContent] = useState("")

    return (
        <div className="w-full">
            <Tabs defaultValue="editor" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="editor">Editor</TabsTrigger>
                    <TabsTrigger value="preview">Pré-visualização</TabsTrigger>
                </TabsList>

                <TabsContent value="editor" className="mt-6">
                    <textarea
                        id="content"
                        rows={20}
                        placeholder="Escreva seu conteúdo aqui usando Markdown..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="resize-none outline-none p-0 focus:ring-0 border-none w-full"
                    />
                </TabsContent>

                <TabsContent value="preview" className="mt-6">
                    <div className="rounded-md p-0 markdown-body min-h-[500px] overflow-auto">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {content || "A pré-visualização aparecerá aqui quando você escrever conteúdo na aba Editor..."}
                        </ReactMarkdown>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
