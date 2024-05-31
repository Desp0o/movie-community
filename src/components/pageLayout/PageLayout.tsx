import React, { ReactNode } from 'react'
import "./PageLayout.css"
import Navbar from '../navbar/navbar';

interface PageLayout {
    children: ReactNode;
}

const PageLayout:React.FC<PageLayout> = ({children}) => {
  return (
    <div className='page_layout'>
      <Navbar />
      <div className='eclipse-bg-top'/>
      <div className='eclipse-bg-right'/>
      <div className='eclipse-bg-left'/>
      <div className='eclipse-bg-bottom'/>
      <div className='page_layout_inner'>
      {children}
      </div>
    </div>
  )
}

export default PageLayout