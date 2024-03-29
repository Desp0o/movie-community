import React, { ReactNode } from 'react'
import "./PageLayout.css"

interface PageLayout {
    children: ReactNode;
}

const PageLayout:React.FC<PageLayout> = ({children}) => {
  return (
    <div className='page_layout'>{children}</div>
  )
}

export default PageLayout