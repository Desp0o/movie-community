import React, { ReactElement } from 'react'

interface IconBlockProps {
    icon: ReactElement;
    quantity?: number;
    width?: number;
}

const IconBlock: React.FC<IconBlockProps> = ({icon, quantity, width}) => {
  return (
    <div className='IconBlock' style={{minWidth:`${width}`}}>
        {icon}
         <p className='iconBlock_number'>{quantity}</p>
    </div>
  )
}

export default IconBlock