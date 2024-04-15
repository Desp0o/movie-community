import React, { useState } from "react";
import { arrowDislike } from "../../assets/svg/arrowDislike"
import { arrowLike } from "../../assets/svg/arrowLike"
import { commentsIcon } from "../../assets/svg/commentsIcon"
import "./singlePostComp.css"
import axios from "axios";
import { activeLike } from "../../assets/svg/activeLike";
import { activeDislike } from "../../assets/svg/activeDislike";

interface LikeDislikeCommentProps {
  likes: number;
  dislikes: number;
  postID: number;
}

const LikeDislikeComment:React.FC<LikeDislikeCommentProps> = ({likes, dislikes, postID}) => {
  const token = localStorage.getItem('token')
  const [votes, seteVotes] = useState(likes - dislikes)
  const [isLikeActive, setLikeActive] = useState(false)
  const [isDislikeActive, setDislikeActive] = useState(false)
  const [likeIcon, setLikeIcon] = useState(arrowLike)
  const [dislikeIcon, setDislikeIcon] = useState(arrowDislike)

  const [isLike, _setLike] = useState({
    post: postID,
    like: 'like'
  })
  const [isUnlike, _setUnLike] = useState({
    post: postID,
    like: 'dislike'
  })

  const sendLike = async () => {
    setLikeActive(!isLikeActive)
    if(!isLikeActive){
      seteVotes(votes + 1)
      setLikeIcon(activeLike)
      setDislikeIcon(arrowDislike)
      setDislikeActive(false)
    }else{
      seteVotes(votes - 1)
      setLikeIcon(arrowLike)
    }


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
    setDislikeActive(!isLikeActive)
    if(!isDislikeActive){
     seteVotes(votes - 1)
     setDislikeIcon(activeDislike)
     setLikeIcon(arrowLike)
     setLikeActive(false)
    }else{
      seteVotes(votes + 1)
      setDislikeIcon(arrowDislike)
    }

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
            <span onClick={()=> sendLike()}>{likeIcon}</span>
            <p style={{ color: votes > 0 ? "green" : votes === 0 ? 'currentColor' : "red" }}>{votes}</p>
            <span onClick={sendUnlike}>{dislikeIcon}</span>
        </div>

        <div className="single_post_comments">
            {commentsIcon}
            <p>0</p>
        </div>
    </div>
  )
}

export default LikeDislikeComment