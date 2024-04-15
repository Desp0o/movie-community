import React, { useState } from "react";
import { arrowDislike } from "../../assets/svg/arrowDislike"
import { arrowLike } from "../../assets/svg/arrowLike"
import { commentsIcon } from "../../assets/svg/commentsIcon"
import "./singlePostComp.css"
import axios from "axios";

interface LikeDislikeCommentProps {
  likes: number;
  dislikes: number;
  postID: number;
}

const LikeDislikeComment:React.FC<LikeDislikeCommentProps> = ({likes, dislikes, postID}) => {
  const token = localStorage.getItem('token')
  const [votes, seteVotes] = useState(likes - dislikes)

  const [isLike, setLike] = useState({
    post: postID,
    like: 'like'
  })
  const [isUnlike, setUnLike] = useState({
    post: postID,
    like: 'dislike'
  })

  const sendLike = async () => {
    seteVotes(votes + 1)
    try {
      const response = await axios.post(import.meta.env.VITE_LIKING, isLike, {
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      console.log(response.data);
      
    } catch (error) {
      console.log(error);
      
    }
  }

  const sendUnlike = async () => {
    seteVotes(votes - 1)
    try {
      const response = await axios.post(import.meta.env.VITE_LIKING, isUnlike, {
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      console.log(response.data);
      
    } catch (error) {
      console.log(error);
      
    }
  }


  return (
    <div className="likeDislikeComment_container">
        <div className="like_dislike">
            <span onClick={()=> sendLike()}>{arrowLike}</span>
            <p style={{ color: votes > 0 ? "green" : votes === 0 ? 'currentColor' : "red" }}>{votes}</p>
            <span onClick={sendUnlike}>{arrowDislike}</span>
        </div>

        <div className="single_post_comments">
            {commentsIcon}
            <p>0</p>
        </div>
    </div>
  )
}

export default LikeDislikeComment