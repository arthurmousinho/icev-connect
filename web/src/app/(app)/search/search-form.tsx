"use client";

import React, { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Search, Heart, ArrowUp, ArrowDown } from "lucide-react";
import type { SearchData } from "@/types/search";

type Topic = {
    id: string;
    title: string;
    slug: string;
};

type SearchFormProps = {
    topics: Topic[];
    defaultValues: SearchData;
};

export function SearchForm({ topics, defaultValues }: SearchFormProps) {

    const router = useRouter();

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const query = formData.get("query")?.toString().trim();
        const orderBy = formData.get("orderBy")?.toString();
        const topicSlugs = formData.getAll("topicSlugs").filter(Boolean);

        const params = new URLSearchParams();

        if (query) params.set("query", query);

        if (orderBy) params.set("orderBy", orderBy);

        if (topicSlugs.length > 0) {
            topicSlugs.forEach((slug) => {
                params.append("topicSlugs", slug.toString());
            });
        }

        router.push(`/search?${params.toString()}`);
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full space-y-6"
            noValidate
        >

            <section className="space-y-2">
                <Input
                    type="search"
                    name="query"
                    placeholder="Buscar por título, descrição, autor..."
                    defaultValue={defaultValues.query}
                    autoComplete="off"
                />
                <Button
                    type="submit"
                    variant="secondary"
                    className="w-full flex items-center justify-center gap-2"
                >
                    <Search size={20} />
                    Buscar
                </Button>
            </section>

            <Separator />

            <section className="space-y-3">
                <h2 className="text-sm text-muted-foreground uppercase">Filtro por Tópico</h2>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                    {topics.map((topic) => (
                        <div key={topic.id} className="flex items-center gap-2">
                            <Checkbox
                                id={`topic-${topic.id}`}
                                name="topicSlugs"
                                value={topic.slug}
                                defaultChecked={defaultValues.topicSlugs?.includes(topic.slug)}
                            />
                            <label htmlFor={`topic-${topic.id}`} className="text-sm cursor-pointer">
                                {topic.title}
                            </label>
                        </div>
                    ))}
                </div>
            </section>

            <Separator />

            <section className="space-y-3">
                <h2 className="text-sm text-muted-foreground uppercase">Ordenar por</h2>
                <Select name="orderBy" defaultValue={defaultValues.orderBy}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Ordenar por" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="relevance">
                            <Heart className="mr-2" />
                            Relevância
                        </SelectItem>
                        <SelectItem value="recent">
                            <ArrowUp className="mr-2" />
                            Mais recente
                        </SelectItem>
                        <SelectItem value="oldest">
                            <ArrowDown className="mr-2" />
                            Mais antigo
                        </SelectItem>
                    </SelectContent>
                </Select>
            </section>

        </form>
    );
}