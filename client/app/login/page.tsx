'use client'
import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import LoginForm from '../Components/loginForm/LoginForm'
import { useUserContext } from '@/context/userContext'

function Page() {

    const {user} = useUserContext()

    const router = useRouter()

    useEffect(() => {
        // redirect to the userpage if user is already logged in
        if (user && user._id) {
            router.push('/')
        }
    }, [user, router])

    // return null or a laod a spiner
    if (user && user._id) {
        return null
    }
  
    
  return (
    <div>
        <LoginForm />
    </div>
  )
}

export default Page