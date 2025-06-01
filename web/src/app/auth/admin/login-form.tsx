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
import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from "react";
import { adminLoginAction } from "./actions";
import { toast } from "sonner";

const loginSchema = z.object({
    email: z
        .string({ message: 'Email é obrigatório' })
        .email({ message: 'Email inválido' }),
    password: z
        .string({ message: 'Senha é obrigatória' })
        .trim()
        .min(1, { message: 'Senha é obrigatória' })
})

export function LoginForm() {

    const searchParams = useSearchParams()

    const router = useRouter();

    const [isLoading, startTransition] = useTransition();

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: searchParams.get('email') || "",
            password: "",
        }
    })

    function onSubmit(values: z.infer<typeof loginSchema>) {
        startTransition(async () => {
            const response = await adminLoginAction(values)
            if (response.success === false) {
                toast.error(response.message)
                return
            }
            router.push('/admin');
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Email
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="johndoe@email.com"
                                    type="email"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Senha
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="*********"
                                    type="password"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full" isLoading={isLoading}>
                    Login
                </Button>
            </form>
        </Form>
    )
}