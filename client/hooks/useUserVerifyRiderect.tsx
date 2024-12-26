'use client'
import { useUserContext } from '@/context/userContext'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'


const useVerifyRiderect = (redirect: string) => {
    const {user, loading} = useUserContext()
    const router = useRouter()

    console.log(user.isVerified)

    useEffect(() => {
        if (user.isVerified === 'no') {
            router.push(redirect)
        } else if (user.isVerified === 'yes') {
            router.push('/')
        }
    }, [user, redirect, router])
}

export default useVerifyRiderect