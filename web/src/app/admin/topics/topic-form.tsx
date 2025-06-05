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

const loginSchema = z.object({
    title: z
        .string({ message: 'Título é obrigatório' })
        .trim()
        .min(6, { message: 'O título deve ter pelo menos 6 caracteres' })
        .max(255, { message: 'O título deve ter no máximo 255 caracteres' })
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
            title: data?.title ?? ''
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
                            <FormLabel>
                                Título
                            </FormLabel>
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
                <div className="space-y-2">
                    <FormLabel>
                        Slug:
                    </FormLabel>
                    <TopicSlugBadge slug={generateSlug(form.watch('title'))} />
                </div>
                <Button variant="default" type="submit" className="w-full" isLoading={isLoading}>
                    Salvar
                </Button>
            </form>
        </Form>
    )
}