
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

import { Roboto } from 'next/font/google';

// Configure the Roboto font
const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'], // Add weights as needed
  style: ['normal', 'italic'], // Optional styles
  variable: '--font-roboto', // Custom CSS variable for easier use
});

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
        className={roboto.className}
      >
        <UserProvider>
          <Toaster position="top-center" />
          <div className="">
            <TwoSidebarProvider>
              <main className="flex-1 p-4 bg-gray-900 overflow-auto  ">
                <MainLayoutContent>{children}</MainLayoutContent>
              </main>
            </TwoSidebarProvider>
          </div>
        </UserProvider>
      </body>
    </html>
  );
}
