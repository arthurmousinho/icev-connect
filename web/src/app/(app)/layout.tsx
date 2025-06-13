import { Header } from "@/components/header";

export default function AppLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="w-full flex flex-col gap-10 justify-center items-center pb-20">
            <Header />
            {children}
        </main>
    )
}