import { arrowDislike } from "../../assets/svg/arrowDislike"
import { arrowLike } from "../../assets/svg/arrowLike"
import { commentsIcon } from "../../assets/svg/commentsIcon"

const LikeDislikeComment = () => {
  return (
    <div className="likeDislikeComment_container">
        <div className="like_dislike">
            {arrowLike}
            <p>0</p>
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