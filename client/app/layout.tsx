import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SideBarL} from "./Components/Sidebar left/SidebarL";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Sidebar } from "lucide-react";
import { AppSidebar } from "@/components/app-sidebar";
import { SideBarR } from "./Components/Sidebar right/SidebarR";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "StudyHive",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex h-screen">
    <SidebarProvider>
      <SideBarL />
     
      <SidebarInset>
      <main className="flex-1 p-4 bg-[#c7d9f0] overflow-auto rounded-xl">
        {children}
      </main>
      </SidebarInset>
      <SideBarR />
      </SidebarProvider>
      
    </div>

      </body>
    </html>
  );
}
