import axios from 'axios';
import React, { SetStateAction, useState } from 'react'
import { Dispatch } from 'react';
import { useUserHook } from '../../hooks/useUserHook';

interface ReplayCommentProps {
    commentID: number;
    feedID: number;
    setter: Dispatch<SetStateAction<number | null>>;
    refetchCallback: ()=>void
}

const ReplayComment: React.FC<ReplayCommentProps> = ({commentID, feedID, setter, refetchCallback}) => {
    const { user } = useUserHook();
    const [replayValue, setReplayValue] = useState('')

  const sendReplay = async (id: number) => {
    const token = localStorage.getItem('token')

    try {
        const res = await axios.post(`${import.meta.env.VITE_ADD_COMMENT}${feedID}`,{
            text: replayValue,
            img: null,
            comment_id: id
        },{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })

        console.log(res);
        setter(null)
    } catch (error) {
        console.error(error)
    }finally{
        refetchCallback()
    }
  }

  return (
    <div className="comment_container">
      {user.avatar && <img src={user?.avatar} alt="user avatar" className="comment_user_avatar"/>}
      <textarea
        className="comment_textarea"
        value={replayValue}
        onChange={(e) => setReplayValue(e.target.value)}
        placeholder="Add comment..."
        style={{width:"250px"}}
      />

      {/* <input multiple type="file" onChange={handleFileChange} /> */}
      <div className="comment_ntm" onClick={()=>sendReplay(commentID)}>
        <p>Post</p>
      </div>
    </div>
  )
}

export default ReplayComment