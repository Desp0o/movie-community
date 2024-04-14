import React from "react";
import { arrowDislike } from "../../assets/svg/arrowDislike"
import { arrowLike } from "../../assets/svg/arrowLike"
import { commentsIcon } from "../../assets/svg/commentsIcon"
import "./singlePostComp.css"

interface LikeDislikeCommentProps {
  likes: number;
  dislikes: number;
}

const LikeDislikeComment:React.FC<LikeDislikeCommentProps> = ({likes, dislikes}) => {
 
  const votes = likes - dislikes

  return (
    <div className="likeDislikeComment_container">
        <div className="like_dislike">
            {arrowLike}
            <p style={{ color: votes > 0 ? "green" : votes === 0 ? 'currentColor' : "red" }}>{votes}</p>
            {arrowDislike}
        </div>

        <div className="single_post_comments">
            {commentsIcon}
            <p>0</p>
        </div>
    </div>
  )
}

export default LikeDislikeComment