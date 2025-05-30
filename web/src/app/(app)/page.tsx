import { Header } from "@/components/header";
import { Hero } from "./hero";

export default function HomePage() {
    return (
        <div className="flex flex-col h-dvh justify-top items-center">
            <Header />
            <main className="w-full flex justify-center mt-10">
                <Hero />
            </main>
        </div>
    )
}