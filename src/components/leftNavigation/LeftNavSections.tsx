import React, { ReactNode } from 'react'

interface LeftNavSectionsProps{
    children: ReactNode;
}

const LeftNavSections:React.FC<LeftNavSectionsProps> = ({children}) => {
  return (
    <div className='left_nav_section'>{children}</div>
  )
}

export default LeftNavSections