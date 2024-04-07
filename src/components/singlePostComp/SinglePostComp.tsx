import React from 'react'
import "./singlePostComp.css"
import Author from './Author'
import PostTitle from './PostTitle'

interface SinglePostProps {
    authorName: string;
    authorAvatar: string;
    postTitle: string;
}

const SinglePostComp:React.FC<SinglePostProps> = ({authorName, authorAvatar, postTitle}) => {
  return (
    <div className='single_post_comp'>
        <Author avatar={authorAvatar} name={authorName}/>
        <PostTitle title={postTitle}/>
    </div>
  )
}

export default SinglePostComp