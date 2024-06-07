import React from 'react'
import "./slider.css"
import cover from "../../assets/quizDefaultCover.webp"
import avatar from "../../assets/Creatorphoto.png"

interface SliderCardProps {
    authorName: string;
    title: string;
}

const SliderCard:React.FC<SliderCardProps> = ({authorName, title}) => {
  return (
    <div className='SliderCard'>
        <img src={cover} alt='sliderCard cover' className='slider_card_img' />
        
        <div className='card_bttom_body'>
        <div className='slider_card_author'>
            <img src={avatar} alt='author' />
            <p>{authorName}</p>
        </div>

        <p className='slider_card_title'>{title}</p>
        </div>

        <div className='slider_Card_btn'>
            <p>Lets Go!</p>
        </div>
    </div>
  )
}

export default SliderCard