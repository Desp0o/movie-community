import React from 'react'
import "../../pages/Quiz_.css"

interface QUIZ_cardProps{
    image: string;
    txt1: string;
    txt2: string;
}

const QUIZ_card:React.FC<QUIZ_cardProps> = ({txt1, txt2, image}) => {
  return (
    <div className="QUIZ_card">
        <img src={image} alt="QUIZ_card" />

        <div className="QUIZ_card_footer" >
          <p className="matrix-txt">{txt1}</p>
          <p className='green-matrix'>{txt2}</p>
        </div>
      </div>
  )
}

export default QUIZ_card