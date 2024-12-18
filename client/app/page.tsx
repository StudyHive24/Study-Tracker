'use client'
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { SideBarL } from "./Components/Sidebar left/SidebarL";
import Dashboard from "./Components/dashboard/page";
import useRiderect from "@/hooks/useUserRiderect";


export default function Home() {
  useRiderect('/login')

  return (
    <div>
      <Dashboard />
    </div>

  );
}