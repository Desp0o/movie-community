import PostStyle from "./PostStyle";
import { addMediaIocn } from "../../../assets/svg/addMediaIcon";
import { quizFeedIocn } from "../../../assets/svg/quizFeedIcon";
import { pollIcon } from "../../../assets/svg/poolIcon";
import { useDispatch } from "react-redux";
import { setAddPostModal } from "../../../Redux/postModal";

const PostBottomButtons = () => {
  const dispatch = useDispatch()

  const openDefaultPostModal = () => {
    dispatch(setAddPostModal({defaultPost: true, pollPost: false, quizPost: false}))
  }

  return (
    <div className="choose_post_style">
      <PostStyle styleName={"Photo/video"} styleIocn={addMediaIocn} funcName={openDefaultPostModal}/>
      <PostStyle styleName={"Quiz"} styleIocn={quizFeedIocn} />
      <PostStyle styleName={"Poll"} styleIocn={pollIcon} />
    </div>
  );
};

export default PostBottomButtons;
