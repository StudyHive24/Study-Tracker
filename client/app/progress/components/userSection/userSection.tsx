import { ImageModal } from '@/app/settings/components/imageModal/ImageModal';
import { useUserContext } from '@/context/userContext';
import { BadgeCheck, Github } from 'lucide-react';
import Link from 'next/link';
import router from 'next/router';
import React from 'react'

export default function UserSection() {
    const { user, updateUser, handlerUserInput, userState, changePassword, removeUserInput, setUserState, emailVerification, verifyUser } = useUserContext();

  
    const { name, email, photo, isVerifed, bio } = user;

    let color1 = 'text-gray-400'
    let color2 = 'lightGray'
    let verifyText = ''
  
    
  
    if (!isVerifed) {
      color1 = 'text-gray-400'
      color2 = 'lightGray'
      verifyText = 'Please Verify'
    } else {
      verifyText = 'Verified'
    }
  
    console.log(isVerifed)
  
    const clickHandle = () => {
      router.push('/send-verification-code')
    }
  return (
    <div className='flex flex-col gap-5'>
                <div className="mt-4 relative flex justify-between bg-gray-700 rounded-xl p-2 ">
          <ImageModal />
          <div className="self-end flex items-center gap-2">
            {/* <Link href={'https://github.com/StudyHive24/Study-Tracker/'} target="_blank">
            <button className="flex items-center gap-2  rounded-md py-1 px-3 text-xs font-medium text-gray-300">
            <Github/> Github
            </button>
            </Link>
            <button onClick={clickHandle} className="flex items-center gap-2 border-2 border-[#323232]/10 rounded-md py-1 px-3 text-xs font-medium text-gray-300">
              <BadgeCheck color={`${color2}`}/> <span className={`${color1}`}>{verifyText}</span>
            </button> */}
            <span className='p-2 text-white'>{bio}</span>
          </div>
        </div>
        <div className="bg-gray-700 p-3 rounded-lg">
          <h1 className="text-lg font-bold text-gray-200">{name}</h1>
          <p className="text-sm text-gray-400">{email}</p>
        </div>
    </div>
  )
}

