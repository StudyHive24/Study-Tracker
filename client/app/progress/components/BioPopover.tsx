import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useUserContext } from "@/context/userContext";

function BioPopover() {
  const { user, updateUser, handlerUserInput, userState } = useUserContext();
  const { bio } = user;
  const [isClient, setIsClient] = useState(false);

  // Ensures component runs only after mount on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Prevent rendering until after the component is mounted on the client
  if (!isClient) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Update user bio
    updateUser(e, {
      bio: userState.bio,
    });
  };

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <span className="p-2 text-white bg-gray-600 rounded-md mr-3 mb-3">
            {bio}
          </span>
        </PopoverTrigger>
        <PopoverContent className="w-80 bg-gray-800 border-gray-700">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 p-2">
              <div className="space-y-2">
                <h4 className="font-medium leading-none text-white">
                  Change the bio
                </h4>
                <p className="text-sm text-gray-400">
                  Make changes to your bio here. Click save when you're done.
                </p>
              </div>
              <div className="grid gap-2">
                <div className="flex grid-cols-2 items-center gap-4">
                  <Label htmlFor="bio" className="text-gray-100">
                    Bio
                  </Label>
                  <Input
                    id="bio"
                    value={userState.bio} // Controlled input
                    className="col-span-2 h-8"
                    onChange={(e) => handlerUserInput("bio")(e)}
                  />
                </div>
              </div>
              <Button type="submit" className="bg-green-500 hover:bg-green-600">
                Save Changes
              </Button>
            </div>
          </form>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default BioPopover;
