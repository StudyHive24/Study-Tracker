'use client'
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { SideBarL } from "./Components/Sidebar left/SidebarL";
import Dashboard from "./Components/dashboard/page";
import useRiderect from "@/hooks/useUserRiderect";

import { Roboto } from 'next/font/google';
import useVerifyRiderect from "@/hooks/useUserVerifyRiderect";




export default function Home() {
  useVerifyRiderect('/send-verification-code')
  useRiderect('/login')



  return (
    <div>
      <Dashboard />
    </div>

  );
}