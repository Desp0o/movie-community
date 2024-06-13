import React, { useEffect, useState } from "react"
import { useUserHook } from "../../hooks/useUserHook"
import EditPannel from "./EditPannel"
import "./StandartQuizStyles.css"

import quizDefaultCover from "../../assets/quizDefaultCover.webp"
import Author from "./Author"
import { Link } from "react-router-dom"
import { popcornIcon } from "../../assets/newSvg/popcornIcon"
import { glassIcon } from "../../assets/newSvg/glassIcon"

interface StandartQuizComponentProps {
  postUserId: number;
  postID: number;
  image?: string;
  authorName: string;
  date: string;
  postTitle: string;
}

const StandartQuizComponent:React.FC<StandartQuizComponentProps> = ({postUserId, image, postID, authorName, date, postTitle}) => {
  const { user } = useUserHook()
  const [isUserLogged, setUserLoged] = useState(false)


  useEffect(()=>{
    if(Number(user.userID) === postUserId){
      setUserLoged(true)
    }else{
      setUserLoged(false)
    }
  },[user, isUserLogged, postUserId])


  return (
    <div className='StandartQuizComponent'>
                  {isUserLogged ? <EditPannel postID={postID} type={4}/> : <></>}

    <div className="quiz_cover_container">
`     <img src={image ? `${import.meta.env.VITE_EASY_QUIZ_IMG}${image}.webp` : quizDefaultCover} alt="quiz cover" className="quiz_cover_img"/>`
    </div>

    <div className="quiz_details">
      <Author name={authorName} date={date} />
      <p className="quiz_title">{postTitle}</p>
      <p className="quiz_short_info">აქ უნდა იყოს რამე აღწერა და გვინდა ეს საერთოდ?</p>
    </div>

    <Link to={''} className="quiz_btn_link">
      <div className="satrt_quiz_btn">
        <p>Get started!</p>
      </div>
    </Link>

    <span className="quiz_popcorn_icon">{popcornIcon}</span>
    <span className="quiz_galss_icon">{glassIcon}</span>
    
    </div>
  )
}

export default StandartQuizComponent