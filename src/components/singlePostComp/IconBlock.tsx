import React, { ReactElement } from 'react'

interface IconBlockProps {
    icon: ReactElement;
    quantity?: number;
    width?: number;
    displayNone?: boolean;
    likeFunction?: () => void
}

const IconBlock: React.FC<IconBlockProps> = ({icon, quantity, width, displayNone, likeFunction}) => {
  return (
    <div className='IconBlock' style={{minWidth:`${width}`}}>
        <span onClick={likeFunction}>{icon}</span>
     <p className='iconBlock_number' style={displayNone ? {display:"none"} : {display: "unset"}}>{quantity ? quantity : 0}</p>
    </div>
  )
}

export default IconBlock