import { SidebarProvider } from '@/components/ui/sidebar'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import React from 'react'
import { UserProfile } from '../../User-Profile/UserProfile'
import Image from 'next/image'
import ImageMe from "../../../../public/Img/userMe.jpg"

interface UserProps {
    width: number,
    height: number
}

function User({width, height} : UserProps) {
  return (
        <Avatar className="flex flex-row justify-center gap-2 items-center">
            <Image src={ImageMe} alt="" className="rounded-full" width={width} height={height}/>
            <div className="flex flex-col items-start">
                <AvatarFallback><span className="text-sm">Madhuka Abhishek</span></AvatarFallback>
                <AvatarFallback><span className="text-[12px] text-[rgb(138,138,138)]">@madhukaabhishek</span></AvatarFallback>
            </div>              
        </Avatar>
  )
}

export default User