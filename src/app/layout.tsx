import type { Metadata } from "next";

import { NavigationLoader } from "@/common/components/navigation-loader";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gustavo & Ana",
  description: "Site de casamento, lista de presentes e checkout Pix.",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Gustavo & Ana",
    description: "Site de casamento, lista de presentes e checkout Pix.",
    images: [
      {
        url: "/logo.png",
        width: 1254,
        height: 1254,
        alt: "Logo Gustavo e Ana",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Gustavo & Ana",
    description: "Site de casamento, lista de presentes e checkout Pix.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full antialiased" data-scroll-behavior="smooth">
      <body className="min-h-full flex flex-col">
        <NavigationLoader />
        {children}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
