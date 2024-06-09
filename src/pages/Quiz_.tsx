import { QUIZ } from "../assets/newSvg/QUIZ"
import "./Quiz_.css"
import ButtonFilled from "../components/buttonFIlled/ButtonFilled"
import ButtonOutlined from "../components/buttonFIlled/ButtonOutlined"
import matrix from "../assets/matrix.webp"
import bacToFuture from "../assets/bacToFuture.webp"
import et from "../assets/e.t.webp"
import { inTheMovie } from "../assets/newSvg/inTheMovie"
import QUIZ_card from "../components/QUIZ_card/QUIZ_card"
import { canYouName } from "../assets/newSvg/canYouName"


const Quiz_ = () => {
  return (
    <div className="Quiz_">

      <div className="quiz_add_rules">

        {/* title */}
        <div className="quiz_add_rules_title">
          <p>Create a </p>
          {QUIZ}
        </div>

        {/* text */}
        <p className="quiz_add_rules_text">
          Welcome to the ... Quiz Creator! Here are the only rules you need to follow:<br /><br />

          All questions must be about movies.<br />
          Each question should have four possible answers, but only one of them is the right one.<br />
          Feel free to add photos to your questions, or skip them entirely. It’s your call!<br /><br />

          Get creative and have fun crafting your ultimate movie quiz!
        </p>

        {/* buttons */}
        <div className="Quiz_btns">
          <ButtonFilled text={"Get started!"} link={""} />
          <ButtonOutlined text={"Check out Quizzes"} link={""} />
      </div>
      </div>

      <div className="guess_info_cards">
      
        <div className="gc1">
          <QUIZ_card image={matrix}>
            <p className="matrix-txt">Who is the main character</p>
            {inTheMovie}
          </QUIZ_card>
        </div>

        <div className="gc2">
          <QUIZ_card image={bacToFuture}>
            <p className="matrix-txt">Who is the main character</p>
            {canYouName}
          </QUIZ_card>
        </div>

        <div className="gc3">
          <QUIZ_card image={et}>
            <p className="matrix-txt">Who is the main character</p>
            {canYouName}
          </QUIZ_card>
        </div>
      </div>
      

    </div>
    
  )
}

export default Quiz_