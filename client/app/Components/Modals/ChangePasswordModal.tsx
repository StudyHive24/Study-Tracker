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
import { useUserContext } from "@/context/userContext";
import React, { useState } from "react";
import toast from "react-hot-toast";

function ChangePasswordModal() {
  const {
    user,
    updateUser,
    handlerUserInput,
    userState,
    changePassword,
    removeUserInput,
    setUserState,
    emailVerification,
    verifyUser,
  } = useUserContext();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handlePassword = (type: string) => (e: any) => {
    if (type === "current") {
      setOldPassword(e.target.value);
    } else {
      setNewPassword(e.target.value);
    }
  };

  let color1 = "text-gray-400";
  let color2 = "lightGray";
  let verifyText = "";

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-blue-500 hover:bg-blue-600">
            Change Password
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-gray-900 border-none">
          <DialogHeader>
            <DialogTitle className="text-white">Change Password</DialogTitle>
            <DialogDescription className="text-gray-400">
              Make changes to your password here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 ">
            <div className="flex flex-col gap-4">
              <Label htmlFor="CurrentPass" className="text-left text-gray-50">
                Current Password
              </Label>
              <Input
                type="password"
                id="CurrentPass"
                onChange={handlePassword("current")}
              />
            </div>
            <div className="flex flex-col gap-4">
              <Label htmlFor="NewPass" className="text-left text-gray-50">
                New Password
              </Label>
              <Input
                type="password"
                id="NewPass"
                onChange={handlePassword("new")}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="bg-green-500 hover:bg-green-600"
              onClick={() => {
                if (newPassword.length < 8) {
                  toast.error("New Password must contain atleast 8 Characters");
                } else if (oldPassword == newPassword) {
                  toast.error("Old and New passwords are same");
                } else {
                  changePassword(oldPassword, newPassword);
                }
              }}
            >
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ChangePasswordModal;
