import PostStyle from "../PostStyle";
import { addMediaIocn } from "../../../assets/svg/addMediaIcon";
import { quizFeedIocn } from "../../../assets/svg/quizFeedIcon";
import { pollIcon } from "../../../assets/svg/poolIcon";

const PostBottomButtons = () => {
  return (
    <div className="choose_post_style">
      <PostStyle styleName={"Photo/video"} styleIocn={addMediaIocn} />
      <PostStyle styleName={"Quiz"} styleIocn={quizFeedIocn} />
      <PostStyle styleName={"Poll"} styleIocn={pollIcon} />
    </div>
  );
};

export default PostBottomButtons;
