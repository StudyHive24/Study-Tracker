import { UserContextProvider } from '@/context/userContext'
import React from 'react'

interface Props {
    children: React.ReactNode
}

function UserProvider({children}: Props) {
  return (
    <UserContextProvider>
        {children}
    </UserContextProvider>
  )
}

export default UserProvider