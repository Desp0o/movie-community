import React, { ReactElement } from 'react'

interface IconBlockProps {
    icon: ReactElement;
    quantity?: number;
    width?: number;
    displayNone?: boolean;
}

const IconBlock: React.FC<IconBlockProps> = ({icon, quantity, width, displayNone}) => {
  return (
    <div className='IconBlock' style={{minWidth:`${width}`}}>
        {icon}
     <p className='iconBlock_number' style={displayNone ? {display:"none"} : {display: "unset"}}>{quantity ? quantity : 0}</p>
    </div>
  )
}

export default IconBlock