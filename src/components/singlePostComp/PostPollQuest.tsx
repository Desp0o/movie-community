import { useState } from "react"
import "./postPollStyles.css"

const PostPollQuest = () => {
  const [pollStats, setPollStats] = useState({
    poll1: 10,
    poll2: 24,
    poll3: 61,
    poll4: 7
  })
  const [voteSummery, setVoteSummery] = useState(pollStats.poll1 + pollStats.poll2 + pollStats.poll3 + pollStats.poll4)


  return (
    <div className='PostPollQuest'>
        <div className='PostPollQuest_questions'>
            <div className='PostPollQuest_questions_item' style={{width:"20px"}}>
                1
            </div>
        </div>

        <div className='votes_undo'>
            <p className='poll_voteCount'>{voteSummery} votes</p>
            <span />
            <p className='poll_undo'>undo</p>
        </div>
    </div>
  )
}

export default PostPollQuest