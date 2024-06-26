import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
// import { useUserHook } from '../../hooks/useUserHook';
import "../../pages/post.css"

interface ReplayCommentProps {
  id: number;
  feedID: number;
  refetchCallback: () => void
}

const ReplayComment: React.FC<ReplayCommentProps> = ({ id, feedID, refetchCallback }) => {
  // const { user } = useUserHook();
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [replayValue, setReplayValue] = useState('')
  const [isFaded, setFaded] = useState(true)

  useEffect(() => {
    if (replayValue.length > 0) {
      setFaded(false)
    } else {
      setFaded(true)
    }
  }, [replayValue])

  const sendReplay = async () => {
    const token = localStorage.getItem('token')

    try {
      await axios.post(`${import.meta.env.VITE_ADD_COMMENT}${feedID}`, {
        text: replayValue,
        img: null,
        comment_id: id
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setReplayValue('')
      setFaded(true)
    } catch (error) {
      console.error(error)
    } finally {
      refetchCallback()
    }
  }

  useEffect(() => {
    if (textareaRef.current) {
      if (replayValue !== '') {
        // Adjust the textarea height based on the scroll height
        textareaRef.current.style.height = "36px"
        if(textareaRef.current.scrollHeight > 36){
          textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
        
        // Ensure the textarea height does not exceed 200px
        if (textareaRef.current.scrollHeight > 200) {
          textareaRef.current.style.height = '200px';
          textareaRef.current.style.overflow = 'auto'
        }else{
          textareaRef.current.style.overflow = 'hidden'
        }
      }
    }
  }, [replayValue]);

  return (
    <div className="single_Replay">
      <textarea
        ref={textareaRef}
        className="replay_textarea"
        value={replayValue}
        onChange={(e) => setReplayValue(e.target.value)}
        placeholder="Add comment..."
        style={{ width: "250px" }}
      />

      {/* <input multiple type="file" onChange={handleFileChange} /> */}
      <span onClick={sendReplay}> <ReplayBtn faded={isFaded} /></span>

    </div>
  )
}

export default ReplayComment



interface ReplayBtnProps {
  faded: boolean;
}
export const ReplayBtn: React.FC<ReplayBtnProps> = ({ faded }) => {
  return (
    <div className={faded ? "replay_btn" : "replay_btn active"}>
      <p>Replay</p>
    </div>
  )
}