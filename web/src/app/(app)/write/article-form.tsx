"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { TopicSelect } from "./topic-select";
import { TitleTextarea } from "./title-textarea";
import { DescriptionTextarea } from "./description-textarea";
import { ArticleEditor } from "./article-editor";
import { z } from "zod";
import { FileUp } from "lucide-react";
import { useTransition } from "react";
import { createArticleAction } from "./actions";
import { toast } from "sonner";

const formSchema = z.object({
    topicId: z
        .string({ message: 'O tópico é obrigatório' })
        .trim()
        .cuid({ message: 'O tópico é obrigatório' })
        .min(1, { message: 'O tópico é obrigatório' }),
    title: z
        .string({ message: 'O título é obrigatório' })
        .trim()
        .min(6, { message: "O título deve ter no mínimo 6 caracteres." })
        .max(255, { message: "O título deve ter no máximo 255 caracteres", }),
    description: z
        .string({ message: 'A descrição é obrigatória' })
        .trim()
        .min(20, { message: "A descrição deve ter no mínimo 20 caracteres." })
        .max(255, { message: "A descrição deve ter no máximo 255 caracteres", }),
    content: z
        .string({ message: 'O conteúdo é obrigatório' })
        .trim()
        .min(20, { message: "O conteúdo deve ter no mínimo 20 caracteres." })
        .max(10000, { message: "O conteúdo deve ter no máximo 10.000 caracteres", }),
})

export type ArticleFormValues = z.infer<typeof formSchema>

export function ArticleForm() {

    const [isLoading, startTransition] = useTransition();

    const form = useForm<ArticleFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            topicId: "",
            title: "",
            description: "",
            content: "",
        }
    })

    function onSubmit(values: ArticleFormValues) {
        startTransition(async () => {
            const response = await createArticleAction(values);

            if (response.success === false) {
                toast.error(response.message);
                return;
            }

            toast.success(response.message);
            form.reset();
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <header className="w-full flex items-center justify-between">
                    <FormField
                        control={form.control}
                        name="topicId"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className="w-[180px]">
                                        <TopicSelect
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" variant="outline" isLoading={isLoading}>
                        Publicar
                        <FileUp />
                    </Button>
                </header>

                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <TitleTextarea
                                    value={field.value}
                                    onChange={field.onChange}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <DescriptionTextarea
                                    value={field.value}
                                    onChange={field.onChange}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormMessage />
                            <FormControl>
                                <ArticleEditor
                                    currentValue={field.value}
                                    onChangeContent={field.onChange}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    )
}