"use client"
// import { useUserContext } from "@/context/userContext"
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import UserAuth from "../Components/User Authentication/UserAuth";

function page() {

    // register
    // const { user } = useUserContext()
    // const router = useRouter()

    // useEffect(() => {
    //     // redirect to home page if user already logged in
    //     if (user && user._id) {
    //         router.push("/")
    //     }
    // }, [user, router])

    // // return null or a loading spinner
    // if (user && user._id) {
    //     return null
    // }


  return (
    <div className="auth-page w-full h-full flex justify-center items-center">
        <UserAuth />
    </div>

  )
}

export default page