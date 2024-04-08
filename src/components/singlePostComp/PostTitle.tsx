import React from 'react'
import "./singlePostComp.css"

interface PostTitleProps {
    title: string;
}

const PostTitle:React.FC<PostTitleProps> = ({title}) => {
  return (
    <p className='post_title'>{title}</p>
  )
}

export default PostTitle