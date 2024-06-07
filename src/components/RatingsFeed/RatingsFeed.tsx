import "./RatingsFeed.css"
import UserRatingItem from "./UserRatingItem"

const RatingsFeed = () => {
  return (
    <div className="RatingsFeed">
        <p>Ratings</p>

        <div className="user_ratings_block">
            <UserRatingItem />
            <UserRatingItem />
            <UserRatingItem />
            <UserRatingItem />
            <div className="view_more_ratings">
              <p>View more</p>
              <span className="view_more_dot_rating" />
              <span className="view_more_dot_rating" />
              <span className="view_more_dot_rating" />
            </div>
        </div>
    </div>
  )
}

export default RatingsFeed