import React, { useEffect, useState } from "react"
import { useUserHook } from "../../hooks/useUserHook"
import EditPannel from "./EditPannel"
import "./StandartQuizStyles.css"

import quizDefaultCover from "../../assets/quizDefaultCover.webp"
import Author from "./Author"
import { popcornIcon } from "../../assets/newSvg/popcornIcon"
import { glassIcon } from "../../assets/newSvg/glassIcon"
import ButtonFIlled from "../buttonFIlled/ButtonFilled"
import { ButtonArrow } from "../buttonFIlled/ButtonArrow"
import { Link } from "react-router-dom"

interface StandartQuizComponentProps {
  postUserId: number;
  postID: number;
  image?: string;
  authorName: string;
  date: string;
  postTitle: string;
  quiz_id: number;
  avatar: string;
}

const StandartQuizComponent: React.FC<StandartQuizComponentProps> = ({avatar, postUserId, image, postID, authorName, date, postTitle, quiz_id }) => {
  const { user } = useUserHook()
  const [isUserLogged, setUserLoged] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (Number(user.userID) === postUserId) {
      setUserLoged(true)
    } else {
      setUserLoged(false)
    }
  }, [user, isUserLogged, postUserId])


  const btnHoverHandler = () => {
    setIsHovered(true)
  }

  const returnBtn = () => {
    setIsHovered(false)
  }

  return (
    <div className='StandartQuizComponent'>
      {isUserLogged ? <EditPannel postID={postID} type={4} /> : <></>}

      <Link to={'/pages/Quiz/'+quiz_id} className="quiz_link">
      <div className="quiz_cover_container">
        {
          image
            ? <>
              <img src={image ? `${import.meta.env.VITE_EASY_QUIZ_IMG}${image}.webp` : quizDefaultCover} alt="quiz cover" className="quiz_cover_bg" />
              <img src={image ? `${import.meta.env.VITE_EASY_QUIZ_IMG}${image}.webp` : quizDefaultCover} alt="quiz cover" className="quiz_cover_img" />
            </>
            : <img src={quizDefaultCover} alt="quiz cover" style={{ width: "100%", height: "100%", objectFit: "cover" }} />

        }
      </div>
      </Link>

      <div className="quiz_details">
        <Author name={authorName} date={date} avatar={avatar}/>
        <p className="quiz_title">{postTitle}</p>
      </div>

      <div className="quiz_btn_link" onMouseOver={btnHoverHandler} onMouseLeave={returnBtn}>
          <span className={!isHovered ? "q_b_2 active" : "q_b_2"}><ButtonFIlled text={"Get started!"} link={'/pages/Quiz/'+quiz_id} /></span> 
          <span className={isHovered ? "q_b_1" : "q_b_1 inactive"}><ButtonArrow link={'/pages/Quiz/'+quiz_id} /></span>  
      </div>

      <span className="quiz_popcorn_icon">{popcornIcon}</span>
      <span className="quiz_galss_icon">{glassIcon}</span>

    </div>
  )
}

export default StandartQuizComponent