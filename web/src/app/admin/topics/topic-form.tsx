"use client"

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import { useTransition } from "react";
import { TopicSlugBadge } from "./topic-slug-badge";
import { generateSlug } from "@/lib/utils";
import { createTopicAction } from "./actions";
import { toast } from "sonner";
import {
    Select,
    SelectContent,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { TopicIconEnum } from "@/types/topic";
import { TopicIcon } from "@/components/topic-icon";

const loginSchema = z.object({
    title: z
        .string({ message: 'Título é obrigatório' })
        .trim()
        .min(6, { message: 'O título deve ter pelo menos 6 caracteres' })
        .max(255, { message: 'O título deve ter no máximo 255 caracteres' }),
    icon: z
        .enum(Object.keys(TopicIconEnum) as [keyof typeof TopicIconEnum])
})

type TopicFormValues = z.infer<typeof loginSchema>;

type TopicFormProps = {
    data?: TopicFormValues;
    isUpdating?: boolean;
}

export function TopicForm({ data, isUpdating = false }: TopicFormProps) {

    const [isLoading, startTransition] = useTransition();

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            title: data?.title ?? '',
            icon: data?.icon ?? TopicIconEnum.DEFAULT
        }
    })

    function onSubmit(values: z.infer<typeof loginSchema>) {
        startTransition(async () => {
            const response = await createTopicAction(values)
            if (response.success === false) {
                toast.error(response.message)
                return
            }
            toast.success(response.message);
            form.reset();
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <header className="flex flex-row items-center justify-between">
                                <FormLabel>
                                    Título
                                </FormLabel>
                                <div className="flex flex-row items-center gap-1">
                                    <FormLabel>
                                        Slug:
                                    </FormLabel>
                                    <TopicSlugBadge slug={generateSlug(form.watch('title'))} />
                                </div>
                            </header>
                            <FormControl>
                                <Input
                                    placeholder="Digite o título do tópico"
                                    type="text"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="icon"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Ícone
                            </FormLabel>
                            <FormControl>
                                <Select onValueChange={(value) => field.onChange(value)}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Ícone do tópico" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.keys(TopicIconEnum).map((key) => (
                                            <TopicIcon icon={key as keyof typeof TopicIconEnum} />
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}                />
                <Button variant="default" type="submit" className="w-full" isLoading={isLoading}>
                    Salvar
                </Button>
            </form>
        </Form>
    )
}