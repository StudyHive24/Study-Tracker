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
  const { user, changePassword } = useUserContext();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePassword = (type: string) => (e: any) => {
    if (type === "current") {
      setOldPassword(e.target.value);
    } else if (type === "new") {
      setNewPassword(e.target.value);
    } else if (type === "confirm") {
      setConfirmPassword(e.target.value);
    }
  };

  // password save handle
  const handleSave = () => {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      changePassword(oldPassword, newPassword);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  // // Disabling the submit button if fields are empty or passwords don't match
  // const isDisabled = !oldPassword || !newPassword || !confirmPassword || newPassword !== confirmPassword;

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
                value={oldPassword}
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
                value={newPassword}
                onChange={handlePassword("new")}
              />
            </div>
            <div className="flex flex-col gap-4">
              <Label htmlFor="ConfirmPass" className="text-left text-gray-50">
                Confirm New Password
              </Label>
              <Input
                type="password"
                id="ConfirmPass"
                value={confirmPassword}
                onChange={handlePassword("confirm")}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              className="bg-green-500 hover:bg-green-600"
              onClick={handleSave}
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
