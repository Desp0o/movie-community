import React from 'react'
import "./singlePostComp.css"

interface PostTitleProps {
    title: string;
    postStatus: number | string;
}

const PostTitle:React.FC<PostTitleProps> = ({title,postStatus}) => {
  return (
    <div style={{display:"flex", alignItems:"center", gap:"5px"}}>
    <p className='post_title'>{title}</p>
    {postStatus === '2' ? <p style={{fontSize:"11px", marginTop:"3px", opacity:"0.5"}}>(Edited)</p> : <></>}
    </div>
  )
}

export default PostTitle