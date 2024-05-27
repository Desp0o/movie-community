import React, { useEffect, useState } from 'react'
import "./singlePostComp.css"

interface PostTitleProps {
    title: string;
    postStatus: number | string;
    page?: string;
    image?: string; //სურათი გვჭირდება ტექსტის სიგრძის დასათვლელად.
}

const PostTitle:React.FC<PostTitleProps> = ({title,postStatus, page, image}) => {
  const [fetchedTitle, setFetchedTitle] = useState(title)
  const [isShortened, setIsShortened] = useState(false)
  const [shortDefault,] = useState(window.innerWidth < 500 ? 600 :  1000)
  const [shortWithImage,] = useState(window.innerWidth < 500 ? 330 :  1000)


  useEffect(()=>{    
    if(fetchedTitle){

      if(fetchedTitle?.length > 1000){
        setIsShortened(true)
        const formatedText = fetchedTitle.substring(0,shortDefault)
        setFetchedTitle(`${formatedText}.....`)
      }

      if(image && fetchedTitle?.length > 560){
        setIsShortened(true)
        const formatedText = fetchedTitle.substring(0,shortWithImage)
        setFetchedTitle(`${formatedText}.....`)
      }
    }
  },[title, fetchedTitle,image, shortDefault, shortWithImage])

  return (
    <div>
    <h3 className='post_title'>{page === 'inner' ? title : fetchedTitle}{isShortened && page !== "inner" && <span className='see_more_title'> see more</span>}</h3>
    {postStatus === '2' ? <p style={{fontSize:"11px", marginTop:"3px", opacity:"0.5"}}>(Edited)</p> : <></>}
    </div>
  )
}

export default PostTitle