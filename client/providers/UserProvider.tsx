import React from 'react'
import { UserContextProvider } from '@/context/userContext.js'
import { TasksProvider } from '@/context/taskContext.js'

interface Props {
    children: React.ReactNode
}

function UserProvider({children}: Props) {
  return (
    <UserContextProvider>
      <TasksProvider>{children}</TasksProvider>
    </UserContextProvider>
  )
}

export default UserProvider