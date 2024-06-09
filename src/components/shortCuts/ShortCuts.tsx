import { pollShortCut } from "../../assets/newSvg/pollShortCut"
import { quizShortCut } from "../../assets/newSvg/quizShortCut"
import "./ShortCuts.css"
import SingleShortCut from "./SingleShortCut"

const ShortCuts = () => {
  return (
    <div className="shortcuts">
        <SingleShortCut icon={quizShortCut} text={"Create quiz"} />
        <SingleShortCut icon={pollShortCut} text={"Create poll"} />
    </div>
  )
}

export default ShortCuts