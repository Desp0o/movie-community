import { Link } from "react-router-dom"
import { pollShortCut } from "../../assets/newSvg/pollShortCut"
import { quizShortCut } from "../../assets/newSvg/quizShortCut"
import "./ShortCuts.css"
import SingleShortCut from "./SingleShortCut"

const ShortCuts = () => {
  return (
    <div className="shortcuts">
      <Link to="/Quiz_">
        <SingleShortCut icon={quizShortCut} text={"Create quiz"} />
      </Link>
        <SingleShortCut icon={pollShortCut} text={"Create poll"} />
    </div>
  )
}

export default ShortCuts