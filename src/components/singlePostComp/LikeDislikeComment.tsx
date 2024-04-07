import { arrowDislike } from "../../assets/svg/arrowDislike"
import { arrowLike } from "../../assets/svg/arrowLike"

const LikeDislikeComment = () => {
  return (
    <div>
        <div className="like_dislike">
            {arrowLike}
            <p>0</p>
            {arrowDislike}
        </div>
    </div>
  )
}

export default LikeDislikeComment