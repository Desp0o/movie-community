import React from 'react'
import { xIcon } from '../../../assets/svg/Xicon';

interface CreateTitleProps{
    title: string;
}

const CreateTitle:React.FC<CreateTitleProps> = ({title}) => {
  return (
    <div className='create_title'>
        <p>{title}</p>
        <span style={{width:"32px", height:"32px"}}>{xIcon}</span>
    </div>
  )
}

export default CreateTitle