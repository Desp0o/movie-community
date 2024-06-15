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
  quiz_id: number;
}

const StandartQuizComponent: React.FC<StandartQuizComponentProps> = ({ postUserId, image, postID, authorName, date, postTitle, quiz_id }) => {
  const { user } = useUserHook()
  const [isUserLogged, setUserLoged] = useState(false)


  useEffect(() => {
    if (Number(user.userID) === postUserId) {
      setUserLoged(true)
    } else {
      setUserLoged(false)
    }
  }, [user, isUserLogged, postUserId])


  return (
    <div className='StandartQuizComponent'>
      {isUserLogged ? <EditPannel postID={postID} type={4} /> : <></>}

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

      <div className="quiz_details">
        <Author name={authorName} date={date} />
        <p className="quiz_title">{postTitle}</p>
      </div>

      <Link to={`/pages/Quiz/${quiz_id}`} className="quiz_btn_link">
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