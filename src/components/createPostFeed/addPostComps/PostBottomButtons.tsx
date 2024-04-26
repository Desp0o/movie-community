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

  const openPollPost = () => {
    dispatch(setAddPostModal({defaultPost: false, pollPost: true, quizPost: false}))
  }


  const openQuizPost = () => {
    dispatch(setAddPostModal({defaultPost: false, pollPost: false, quizPost: true}))
  }


  return (
    <div className="choose_post_style">
      <PostStyle styleName={"Photo/video"} styleIocn={addMediaIocn} funcName={openDefaultPostModal}/>
      <PostStyle styleName={"Quiz"} styleIocn={quizFeedIocn} funcName={openQuizPost}/>
      <PostStyle styleName={"Poll"} styleIocn={pollIcon} funcName={openPollPost}/>
    </div>
  );
};

export default PostBottomButtons;
