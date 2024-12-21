import { SidebarProvider } from '@/components/ui/sidebar'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import React from 'react'
import { UserProfile } from '../../User-Profile/UserProfile'
import Image from 'next/image'
import ImageMe from "../../../../public/Img/userMe.jpg"
import Profile from '../../Profile/Profile'

interface UserProps {
    width: number,
    height: number
}

function User({width, height} : UserProps) {
  return (
    <div>
        <Profile/>
        </div>
  )
}

export default User