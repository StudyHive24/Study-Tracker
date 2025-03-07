import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserProfileTab } from "./User-Profile-tab";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import ImageMe from "../../../public/Img/userMe.jpg";
import Image from "next/image";
import User from "../Sidebar right/Components/User";

export function UserProfile() {
  return (
    <div className="mr-1 mt-3">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="h-[70px] w-full rounded-full">
            <User width={50} height={30} />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle></DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <UserProfileTab />
        </DialogContent>
      </Dialog>
    </div>
  );
}
