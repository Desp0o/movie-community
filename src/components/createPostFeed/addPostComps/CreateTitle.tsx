import React from 'react'
import { xIcon } from '../../../assets/svg/Xicon';

interface CreateTitleProps{
    title: string;
    funcName: () => void
}

const CreateTitle:React.FC<CreateTitleProps> = ({title, funcName}) => {
  return (
    <div className='create_title'>
        <p>{title}</p>
        <span style={{width:"32px", height:"32px", cursor:"pointer"}} onClick={funcName}>{xIcon}</span>
    </div>
  )
}

export default CreateTitle