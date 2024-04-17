import React from "react"

interface Comment {
  id: number;
  text: string;
  img: string;
  // Add more properties if needed
}

interface ComProps {
  fetchedComments: Comment[];
}

const CommentsSection:React.FC<ComProps> = ({fetchedComments}) => {
  const imageStoragePath = import.meta.env.VITE_COMMENT_IMAGE

  return (
    <div>
      {fetchedComments?.map((item)=>{
        return(
          <>
          <p>{item.text} </p> <img style={{width:"50px"}} src={`${imageStoragePath}${item.img}.webp`} />
          </>
        )
      })}
    </div>
  )
}

export default CommentsSection