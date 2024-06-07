import React, { useEffect, useState } from "react"
import { useUserHook } from "../../hooks/useUserHook"
import EditPannel from "./EditPannel"
import "./StandartQuizStyles.css"

import quizDefaultCover from "../../assets/quizDefaultCover.webp"

interface StandartQuizComponentProps {
  postUserId: number;
  postID: number;
  image?: string;
}

const StandartQuizComponent:React.FC<StandartQuizComponentProps> = ({postUserId, image, postID}) => {
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
                  {isUserLogged ? <EditPannel postID={0} type={5}/> : <></>}

    <div className="quiz_cover_container">
`     <img src={image ? image : quizDefaultCover} alt="quiz cover" className="quiz_cover_img"/>`
    </div>

    </div>
  )
}

export default StandartQuizComponent