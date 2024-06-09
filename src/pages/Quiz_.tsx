import { QUIZ } from "../assets/newSvg/QUIZ"
import "./Quiz_.css"


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
        Welcome to the ... Quiz Creator! Here are the only rules you need to follow:<br/><br/>

All questions must be about movies.<br/>
Each question should have four possible answers, but only one of them is the right one.<br/>
Feel free to add photos to your questions, or skip them entirely. It’s your call!<br/><br/>

Get creative and have fun crafting your ultimate movie quiz!
        </p>
      </div>

    </div>
  )
}

export default Quiz_