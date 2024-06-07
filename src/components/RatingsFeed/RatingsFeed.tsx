import "./RatingsFeed.css"
import UserRatingItem from "./UserRatingItem"

const RatingsFeed = () => {
  return (
    <div className="RatingsFeed">
        <p>Ratings</p>

        <div className="user_ratings_block">
            <UserRatingItem />
        </div>
    </div>
  )
}

export default RatingsFeed