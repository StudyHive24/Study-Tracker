'use client'
import { useRouter } from 'next/navigation'
import React, {useEffect} from 'react'
import { useUserContext } from '@/context/userContext'
import RegisterForm from '../Components/registerFrom/RegisterForm'
import WelcomeHeader from '../Components/Welcome Header/WelcomeHeader'

function Page() {

    const { user } = useUserContext()
    const router = useRouter()

    useEffect(() => {
        if (user && user._id) {
            router.push('/')
        }
    }, [user, router])

      // return null or a loading spinner/indicator
    if (user && user._id) {
        return null;
    }

  return (
    <div>
      <WelcomeHeader link={'/login'}/>
      <RegisterForm />
    </div>
  ) 
}

export default Page