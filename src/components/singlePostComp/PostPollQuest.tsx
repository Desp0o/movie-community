import "./postPollStyles.css"

const PostPollQuest = () => {
  return (
    <div className='PostPollQuest'>
        <div className='PostPollQuest_questions'>
            <div className='PostPollQuest_questions_item' style={{width:"20px"}}>
1
            </div>
        </div>

        <div className='votes_undo'>
            <p className='poll_voteCount'>10 votes</p>
            <span />
            <p className='poll_undo'>undo</p>
        </div>
    </div>
  )
}

export default PostPollQuest