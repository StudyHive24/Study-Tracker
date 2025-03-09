import { useUserContext } from "@/context/userContext";
import { useRef, useState } from "react";
import blankImage from "@/public/blank_profile.webp";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { BadgeCheck, FilePenLine } from "lucide-react";
import { badge } from "@/utils/Icons";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

import { useRouter } from "next/navigation";
import ChangePasswordModal from "@/app/Components/Modals/ChangePasswordModal";
import ImageUpload from "./ImageUpload";
[1, 2, 5];

export function ImageModal() {
  const { user, updateUser, handlerUserInput, userState } = useUserContext();
  const { name, email, photo, isVerifed } = user;

  const [formData, setFormData] = useState({
    name: name || "",
    email: email || "", 
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const router = useRouter();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="relative inline-block p-2">
          <Image
            src={user?.image || blankImage}
            alt="profile"
            width={90}
            height={90}
            className="rounded-full max-w-16"
          />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-gray-900 border-none">
        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();

            // update the user
            updateUser(e, {
              email: userState.email,
              name: userState.name,
            });

            router.push("/");
          }}
        >
          <DialogHeader>
            <DialogTitle className="text-white">Edit profile</DialogTitle>
            <DialogDescription className="text-gray-200">
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4 -mt-3 mb-2">
            <div className="flex justify-center items-center relative">
              {/* user's image */}
              <Image
                src={user?.image}
                alt="me"
                width={130}
                height={130}
                className="rounded-2xl "
              />
              <div className="absolute bottom-1 right-32">
                <ImageUpload />
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4 mt-2">
              <Label htmlFor="name" className="text-right text-white">
                Username
              </Label>
              <Input
                id="name"
                name="name"
                defaultValue={user.name}
                onChange={(e) => handlerUserInput("name")(e)}
                className="col-span-3 bg-gray-800 text-white"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right text-white">
                Email
              </Label>
              <Input
                id="username"
                defaultValue={user.email}
                onChange={(e) => handlerUserInput("email")(e)}
                className="col-span-3 bg-gray-800 text-white"
              />
            </div>
          </div>
          <DialogFooter>
            <ChangePasswordModal />
            <Button type="submit" className="bg-green-500 hover:bg-green-600">
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
