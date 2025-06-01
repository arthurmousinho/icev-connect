import type { Metadata } from "next";
import { Noto_Serif, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  variable: "--font-noto-serif",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "iCEVConnect",
  description: "Rede acadêmica para os alunos do iCEV para troca de conhecimento dentro do ambiente acadêmico",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${geistMono.variable} ${notoSerif.variable} antialiased font-sans`}
      >
        <Toaster />
        {children}
      </body>
    </html>
  );
}
