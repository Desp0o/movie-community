import React, { ReactNode } from 'react'
import "./PageLayout.css"
import LeftNavigation from '../leftNavigation/LeftNavigation';
import Navbar from '../navbar/navbar';

interface PageLayout {
    children: ReactNode;
}

const PageLayout:React.FC<PageLayout> = ({children}) => {
  return (
    <div className='page_layout'>
      <Navbar />
      <LeftNavigation />
      <div className='page_layout_inner'>
      {children}
      </div>
    </div>
  )
}

export default PageLayout