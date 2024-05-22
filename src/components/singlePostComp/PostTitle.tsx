import React, { useEffect, useState } from 'react'
import "./singlePostComp.css"

interface PostTitleProps {
    title: string;
    postStatus: number | string;
    page?: string;
}

const PostTitle:React.FC<PostTitleProps> = ({title,postStatus, page}) => {
  const [fetchedTitle, setFetchedTitle] = useState(title)
  const [isShortened, setIsShortened] = useState(false)

  useEffect(()=>{
    if(fetchedTitle){

      if(fetchedTitle?.length > 1000){
        setIsShortened(true)
        const formatedText = fetchedTitle.substring(0,1000)
        setFetchedTitle(`${formatedText}.....`)
      }
    }
  },[title])

  return (
    <div>
    <h3 className='post_title'>{page === 'inner' ? title : fetchedTitle}{isShortened && page !== "inner" && <span className='see_more_title'>see more</span>}</h3>
    {postStatus === '2' ? <p style={{fontSize:"11px", marginTop:"3px", opacity:"0.5"}}>(Edited)</p> : <></>}
    </div>
  )
}

export default PostTitle