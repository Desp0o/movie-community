import React, { ReactNode } from 'react'
import { useDarkModeHook } from '../../hooks/useDarkModeHook';

interface leftNavItemProps{
    icon: ReactNode;
    title: string;
}

const LeftNavItem:React.FC<leftNavItemProps> = ({icon, title}) => {
  const {isDark} = useDarkModeHook()
  
  return (
    <div className={isDark ? "left_nav_item dark" : "left_nav_item"}>
        <span className='left_nav_item_icon'>{icon}</span>
        <p>{title}</p>
    </div>
  )
}

export default LeftNavItem