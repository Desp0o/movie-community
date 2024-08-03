import { Link } from "react-router-dom"
import { pollShortCut } from "../../assets/newSvg/pollShortCut"
import { quizShortCut } from "../../assets/newSvg/quizShortCut"
import "./ShortCuts.css"
import SingleShortCut from "./SingleShortCut"
import { useDispatch } from "react-redux"
import { setAddPostModal } from "../../Redux/postModal"

const ShortCuts = () => {

  const dispatch = useDispatch()

  const openAddPoll = () => {
    dispatch(setAddPostModal({pollPost: true}))
  }

  return (
    <div className="shortcuts">
      <Link to="/Quiz_" className="shortCut_link">
        <SingleShortCut icon={quizShortCut} text={"Create quiz"} />
      </Link>
      <Link to='' className="shortCut_link" onClick={openAddPoll}>
        <SingleShortCut icon={pollShortCut} text={"Create poll"} />
      </Link>
    </div>
  )
}

export default ShortCuts