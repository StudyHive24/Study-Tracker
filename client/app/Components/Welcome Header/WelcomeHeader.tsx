import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Url } from "next/dist/shared/lib/router/router";
import { Hand } from "lucide-react";

interface Props {
  link: Url;
}

const WelcomeHeader = ({ link }: Props) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // prevent rendering until mounted on the client
  }

  return (
    <div className="flex justify-center">
      <div className="flex justify-between mb-5 w-[70vw] bg-white p-5 m-3 rounded-lg ">
        <div className="flex flex-col">
          <span className="flex gap-2">
            <Hand color="orange" className="font-bold" />
            <span className="text-xl font-bold">Welcome to StudyHive</span>
          </span>
          <span className="text-gray-600">
            Please login or register to view your tasks
          </span>
        </div>
        <div>
          <Link href={link}>
            <Button className="bg-blue-500 hover:bg-blue-600 mt-1">
              Login / Register
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHeader;
