import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SideBarL } from "./Components/Sidebar left/SidebarL";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Sidebar } from "lucide-react";
import { AppSidebar } from "@/components/app-sidebar";
import { SideBarR } from "./Components/Sidebar right/SidebarR";
import UserProvider from "@/providers/UserProvider";
import { Toaster } from "react-hot-toast";
import { UserContextProvider } from "@/context/userContext";
import useRiderect from "@/hooks/useUserRiderect";
import MainLayoutContent from "@/providers/MainLayoutContent";
import TwoSidebarProvider from "@/providers/TwoBarProvider";

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
        <UserContextProvider>
          <Toaster position="top-center" />
          <div className="">
            <TwoSidebarProvider>
              <main className="flex-1 p-4 bg-[#c7d9f0] overflow-auto rounded-xl">
                <MainLayoutContent>{children}</MainLayoutContent>
              </main>
            </TwoSidebarProvider>
          </div>
        </UserContextProvider>
      </body>
    </html>
  );
}
