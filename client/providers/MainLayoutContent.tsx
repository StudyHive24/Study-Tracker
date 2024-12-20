'use client'
import { useUserContext } from '@/context/userContext'
import React from 'react'

interface MainLayoutContentProps {
    children: React.ReactNode
}

function MainLayoutContent({ children }: MainLayoutContentProps) {
    const userID = useUserContext().user._id
  return (
    <div>
        <main className={`${userID ? 'pr-[20rem]' : ''}`}>
            {children}
        </main>
    </div>
  )
}

export default MainLayoutContent