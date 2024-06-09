import React, { ReactNode } from 'react'
import "../../pages/Quiz_.css"

interface QUIZ_cardProps{
    image: string;
    children: ReactNode;
}

const QUIZ_card:React.FC<QUIZ_cardProps> = ({children, image}) => {
  return (
    <div className="QUIZ_card">
        <img src={image} alt="QUIZ_card" />

        <div className="QUIZ_card_footer" >
         {children}
        </div>
      </div>
  )
}

export default QUIZ_card