import "./RatingsFeed.css"
import userAvatar from "../../assets/Creatorphoto.png"
import { pointsIcon } from "../../assets/newSvg/pointsIcon"

const UserRatingItem = () => {
  return (
    <div className='UserRatingItem'>
        <div className='UserRatingItem_inner'>

            {/* position and user ifno */}
            <div className="userName_userPos">
                <div className="rating_circle"><p>1</p></div>

                <div className="user_rating">
                  <img src={userAvatar} alt="user avatar" className="user_avatar_ratings" />
                  <p>Anonymus</p>
                </div>
            </div>

            {/* points */}
            <div className="ratings_points">
              <p>100</p>
              {pointsIcon}
            </div>
        </div>
    </div>
  )
}

export default UserRatingItem