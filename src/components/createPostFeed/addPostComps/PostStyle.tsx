import React, { ReactElement } from 'react'

interface PostStyleProps {
    styleName: string;
    styleIocn: ReactElement;
    funcName: () => void
}

const PostStyle:React.FC<PostStyleProps> = ({styleName, styleIocn, funcName}) => {
  return (
    <div className='postStyle_container' onClick={funcName}>
        <span>{styleIocn}</span>
        <p>{styleName}</p>
    </div>
  )
}

export default PostStyle;