"use client";
import { useUserContext } from "@/context/userContext";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

function ForgotPasswordForm() {
  const { requestResetCode } = useUserContext();
  const [email, setEmail] = useState("");
  const [isClient, setIsClient] = useState(false); // to ensure client-side rendering

  // to ensure the component runs only on the client-side
  useEffect(() => {
    setIsClient(true);
  }, []);

  const emailChangeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const submitHandle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email === "") {
      toast.error("Enter the email");
    } else {
      requestResetCode(email);
      setEmail(""); // to clear the input email after submission
    }
  };

  if (!isClient) {
    return null; // to prevent hydration errors by not rendering the component on the server side
  }

  return (
    <div className="flex justify-center p-3">
      <form onSubmit={submitHandle}>
        <div className="flex flex-col gap-4 bg-white p-12 rounded-lg mt-3">
          <div className="flex justify-center">
            <span className="text-xl">Enter email to reset your password</span>
          </div>
          <span className="text-sm text-gray-400 text-center mb-5">
            Login now, Don't have an account?
            <Link href="/register" className="text-green-500">
              {" "}
              Register Here
            </Link>
          </span>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label>Email</label>
              <hr />
              <input
                type="email"
                className="p-1 w-[30vw] outline-none focus:border-2 border-blue-300 rounded-md"
                placeholder="Enter email"
                value={email}
                onChange={emailChangeHandle}
                required
              />
              <hr />
            </div>

            <button
              type="submit"
              className="bg-blue-300 p-2 rounded-lg mt-3 hover:bg-blue-400 cursor-pointer"
            >
              Reset Password
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ForgotPasswordForm;
