'use client'
import { SideBarL } from '@/app/Components/Sidebar left/SidebarL'
import { SideBarR } from '@/app/Components/Sidebar right/SidebarR'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { useUserContext } from '@/context/userContext'
import React from 'react'

interface TwoSidebarProviderProps {
    children: React.ReactNode
}

function TwoSidebarProvider({ children }: TwoSidebarProviderProps) {
    const userID = useUserContext().user._id
  return (
    <div>
        {/* <main className={`${userID ? 'pr-[20rem]' : ''}`}>
            {children}
        </main> */}
        <SidebarProvider>
          <div className={`${!userID ? 'hidden' : ''}`}>
            <SideBarL/>
          </div>
          <SidebarInset>
              {children}
          </SidebarInset>
          <div className={`${!userID ? 'hidden' : ''}`}>
            <SideBarR/>
          </div>
        </SidebarProvider>
    </div>
  )
}

export default TwoSidebarProvider