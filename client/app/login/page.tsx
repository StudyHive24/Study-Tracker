"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import LoginForm from "../Components/authentication/loginForm/LoginForm";
import { useUserContext } from "@/context/userContext";
import WelcomeHeader from "../Components/Welcome Header/WelcomeHeader";

function Page() {
  const { user } = useUserContext();

  const router = useRouter();

  useEffect(() => {
    // redirect to the userpage if user is already logged in
    if (user && user._id) {
      router.push("/");
    }
  }, [user, router]);

  if (user && user._id) {
    return null;
  } else {
    console.log("There is no user");
  }

  return (
    <div>
      <WelcomeHeader link={"/register"} />
      <LoginForm />
    </div>
  );
}

export default Page;
