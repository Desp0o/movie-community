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

const word = "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
  useEffect(()=>{
    console.log(word.length);
    
    if(fetchedTitle){

      if(fetchedTitle?.length > 1000){
        setIsShortened(true)
        const formatedText = fetchedTitle.substring(0,1000)
        setFetchedTitle(`${formatedText}.....`)
      }

      if(image && fetchedTitle?.length > 560){
        setIsShortened(true)
        const formatedText = fetchedTitle.substring(0,560)
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