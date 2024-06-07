import React, { ReactNode } from 'react'
import "./PageLayout.css"
import Navbar from '../navbar/navbar';
import RatingsFeed from '../RatingsFeed/RatingsFeed';

interface PageLayout {
    children: ReactNode;
}

const PageLayout:React.FC<PageLayout> = ({children}) => {
  return (
    <>
    <div className='page_layout'>
      <Navbar />
      
      <div className='page_layout_inner'>
        <RatingsFeed />
      {children}
      </div>
    </div>
    </>
  )
}

export default PageLayout