import PostStyle from "./PostStyle";
import { addMediaIocn } from "../../../assets/svg/addMediaIcon";
import { quizFeedIocn } from "../../../assets/svg/quizFeedIcon";
import { pollIcon } from "../../../assets/svg/poolIcon";
import { useDispatch } from "react-redux";
import { setAddPostModal } from "../../../Redux/postModal";
import { usePostAddModalHook } from "../../../hooks/usePostAddModalHook";

const PostBottomButtons = () => {
  const dispatch = useDispatch()
  const { addPostModalStates } = usePostAddModalHook()


  const openDefaultPostModal = () => {
    dispatch(setAddPostModal({defaultPost: true, pollPost: false, quizPost: false, openImageUpload:false}))

    if(addPostModalStates.defaultPost){
      console.log('okey i will open img');
      dispatch(setAddPostModal({defaultPost: true, openImageUpload:true}))
    }

  }

  const openPollPost = () => {
    dispatch(setAddPostModal({defaultPost: false, pollPost: true, quizPost: false, openImageUpload:false}))
  }


  const openQuizPost = () => {
    dispatch(setAddPostModal({defaultPost: false, pollPost: false, quizPost: true, openImageUpload:false}))
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
