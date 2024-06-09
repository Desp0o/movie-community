import React, { ReactElement } from 'react'

interface SingleShortCutProps {
    icon: ReactElement;
    text: string;
}

const SingleShortCut:React.FC<SingleShortCutProps> = ({icon, text}) => {
  return (
    <div className='SingleShortCut'>
        <span>{icon}</span>
        <p>{text}</p>
    </div>
  )
}

export default SingleShortCut