import React, { ReactElement } from 'react'

interface IconContainerProps {
    icon: ReactElement;
    number: number;
    funcName?: ()=>void
}

const IconContainer:React.FC<IconContainerProps> = ({icon, number, funcName}) => {
  return <div className="like_container">
  <span className="icon_container_likeComp" onClick={funcName}>{icon}</span>
  <p style={{width:"25px"}}>{number}</p>
</div>
}

export default IconContainer