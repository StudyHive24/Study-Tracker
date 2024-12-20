import React from 'react'
import { UserContextProvider } from '@/context/userContext.js'
import { TasksProvider } from '@/context/taskContext.js'
import { TimersProvider } from '@/context/timerContext.js'

interface Props {
    children: React.ReactNode
}

function UserProvider({children}: Props) {
  return (
    <UserContextProvider>
      <TasksProvider>
        <TimersProvider>
          {children}
        </TimersProvider>
        </TasksProvider>
    </UserContextProvider>
  )
}

export default UserProvider