'use client'
import { useUserContext } from '@/context/userContext'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'


const useVerifyRiderect = (redirect: string) => {
    const {user, loading} = useUserContext()
    const router = useRouter()

    useEffect(() => {
        if (!user.isVerified) {
            router.push(redirect)
        }
    }, [user, redirect, router])
}

export default useVerifyRiderect