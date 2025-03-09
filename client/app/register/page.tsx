"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useUserContext } from "@/context/userContext";
import RegisterForm from "../Components/authentication/registerForm/RegisterForm";
import WelcomeHeader from "../Components/Welcome Header/WelcomeHeader";

function Page() {
  const { user } = useUserContext();
  const router = useRouter();

  // if user aready logged in, riderect the user to the main page
  useEffect(() => {
    if (user && user._id) {
      router.push("/");
    }
  }, [user, router]);

  if (user && user._id) {
    return null;
  }

  return (
    <div>
      <WelcomeHeader link={"/login"} />
      <RegisterForm />
    </div>
  );
}

export default Page;
