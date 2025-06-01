import type React from "react";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ProfileButton } from "@/components/profile-button";
import { AdminSidebar } from "./admin-sidebar";

type Props = {
    children: React.ReactNode,
}

export default function AdminLayout({ children }: Props) {
    return (
        <SidebarProvider>
            <div className="flex flex-col h-screen w-full">
                <div className="flex flex-1 overflow-hidden mr-2">
                    <AdminSidebar />
                    <SidebarInset className="flex-1 space-y-2 p-0 my-2">
                        <header className="flex flex-row items-center justify-between border-b bg-sidebar border rounded-md p-2">
                            <SidebarTrigger variant="outline" />
                            <ProfileButton />
                        </header>
                        <div className="w-full h-full bg-sidebar border rounded-md overflow-auto p-4">
                            {children}
                        </div>
                    </SidebarInset>
                </div>
            </div>
        </SidebarProvider>
    )
}