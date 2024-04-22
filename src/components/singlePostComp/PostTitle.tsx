import React from 'react'
import "./singlePostComp.css"

interface PostTitleProps {
    title: string;
    postStatus: number | string;
}

const PostTitle:React.FC<PostTitleProps> = ({title,postStatus}) => {
  return (
    <div>
    <h3 className='post_title'>{title}</h3>
    {postStatus === '2' ? <p style={{fontSize:"11px", marginTop:"3px", opacity:"0.5"}}>(Edited)</p> : <></>}
    </div>
  )
}

export default PostTitle