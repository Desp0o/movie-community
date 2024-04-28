import { useDispatch } from "react-redux";
import { useUserHook } from "../../hooks/useUserHook"
import "./CreatePostFeed.css"
import PostBottomButtons from "./addPostComps/PostBottomButtons"
import { setAddPostModal } from "../../Redux/postModal";
import noAvatar from "../../assets/noAvatar.jpeg"


const CreatePostFeed = () => {
    const { user } = useUserHook();
    const dispatch = useDispatch()
    
    const openDefaultPostModal = () => {
        dispatch(setAddPostModal({defaultPost: true, pollPost: false, quizPost: false, showPostButtons: true}))
      }    

    return (
        <div className="CreatePostFeed">
            <div className="user_avatar_input">
                <img
                    src={user.avatar ? user.avatar : noAvatar}
                    alt="user avatar"
                    className="user_avatar_feed"
                />

                <input
                    type="text"
                    className="feed_input"
                    placeholder="Create post"
                    onClick={openDefaultPostModal}
                />
            </div>

            <span style={{paddingLeft:"58px"}}><PostBottomButtons /></span>
        </div>
    );  
};



export default CreatePostFeed