import React, { Children } from 'react'

interface MainLayoutProps {
    children: React.ReactNode
}

function MainLayout({ children }: MainLayoutProps) {
  return  <div className='main-layout flex-1 bg-[#ededed] border-2 border-white rounded-[1.5rem] overflow-auto'>{children}</div>
  
}

export default MainLayout;
