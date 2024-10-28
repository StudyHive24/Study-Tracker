import { Button } from "@/components/ui/button";
import Image from "next/image";
import { SideBar } from "./Components/Sidebar.tsx/Sidebar";


export default function Home() {

  return (
    <div>
      <Button>Sign out</Button>
      <SideBar />
    </div>

  );
}
