import PostStyle from "./PostStyle";
import { addMediaIocn } from "../../../assets/svg/addMediaIcon";
import { pollIcon } from "../../../assets/svg/poolIcon";
import { useDispatch } from "react-redux";
import { setAddPostModal } from "../../../Redux/postModal";
import { usePostAddModalHook } from "../../../hooks/usePostAddModalHook";

const PostBottomButtons = () => {
  const dispatch = useDispatch()
  const { addPostModalStates } = usePostAddModalHook()


  const openDefaultPostModal = () => {
    dispatch(setAddPostModal({defaultPost: true, pollPost: false, quizPost: false, openImageUpload:false, showPostButtons: true}))

    if(addPostModalStates.defaultPost){
      dispatch(setAddPostModal({defaultPost: true, openImageUpload:true, quizPost: false, pollPost: false, showPostButtons: true}))
    }

    document.body.style.overflow='hidden'

  }

  const openPollPost = () => {
    document.body.style.overflow='hidden'

    dispatch(setAddPostModal({defaultPost: false, pollPost: true, quizPost: false, openImageUpload:false, showPostButtons: true}))
  }

  return (
    <div className="choose_post_style">
      <PostStyle styleName={"Photo/video"} styleIocn={addMediaIocn} funcName={openDefaultPostModal}/>
      <PostStyle styleName={"Poll"} styleIocn={pollIcon} funcName={openPollPost}/>
    </div>
  );
};

export default PostBottomButtons;
