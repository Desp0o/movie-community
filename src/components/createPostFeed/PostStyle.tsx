import React, { ReactElement } from 'react'

interface PostStyleProps {
    styleName: string;
    styleIocn: ReactElement;
    onclick?: () => void
}

const PostStyle:React.FC<PostStyleProps> = ({styleName, styleIocn}) => {
  return (
    <div className='postStyle_container' onClick={() => onclick}>
        <span>{styleIocn}</span>
        <p>{styleName}</p>
    </div>
  )
}

export default PostStyle;