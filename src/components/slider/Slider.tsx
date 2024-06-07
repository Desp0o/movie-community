import { useState } from "react"
import SliderCard from "./SliderCard"
import "./slider.css"

const cardArray = [
    {
        author: "despo",
        title: "card 1"
    },
    {
        author: "koka",
        title: "card 2"
    },
    {
        author: "vajika",
        title: "card 4"
    }
]


const Slider = () => {
    
    const [activeIndex, setActiveIndex] = useState(0)
    
 
    return (
        <div className="Slider">
                <div className="cards_flex">

                
            {
                cardArray.map((card, index) => {
                    return (
                        <div className={activeIndex === index ? "slider_card_active" : "slider_card_active inactive"}>
                            <SliderCard key={index} authorName={card.author} title={card.title} />
                        </div>
                    )
                })
            }
            </div>
            <div className="slider_dots">
                <span className="sliderDot_single" onClick={()=> setActiveIndex(1)}/>
                <span className="sliderDot_single" onClick={()=> setActiveIndex(0)}/>
                <span className="sliderDot_single" onClick={()=> setActiveIndex(2)}/>
            </div>
        </div>
    )
}

export default Slider