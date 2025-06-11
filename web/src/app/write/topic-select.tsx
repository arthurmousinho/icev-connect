'use client'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { findAllTopicsRequest } from "@/http/topic/find-all-topics.http"
import { useEffect, useState } from "react"

type TopicSelectProps = {
    value?: string;
    onValueChange: (topicId: string) => void
}

export function TopicSelect({ onValueChange, value }: TopicSelectProps) {

    const [topics, setTopics] = useState<{ id: string, title: string }[]>([])

    useEffect(() => {
        async function loadTopics() {
            try {
                const { data } = await findAllTopicsRequest()
                setTopics(data)
            } catch (err) {
                console.error("Erro ao buscar tópicos:", err)
            }
        }
        loadTopics()
    }, [])

    return (
        <Select onValueChange={onValueChange} value={value}>
            <SelectTrigger className="w-full border-none shadow-none p-0">
                <SelectValue placeholder="Selecione o tópico" />
            </SelectTrigger>
            <SelectContent>
                {topics?.map((topic) => (
                    <SelectItem
                        key={topic.id}
                        value={topic.id}
                    >
                        {topic.title}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}