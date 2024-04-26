import { useUserHook } from "../../hooks/useUserHook"
import "./CreatePostFeed.css"
import PostBottomButtons from "./addPostComps/PostBottomButtons"


const CreatePostFeed = () => {
    const { user } = useUserHook();

    return (
        <div className="CreatePostFeed">
            <div className="user_avatar_input">
                <img
                    src={user.avatar}
                    alt="user avatar"
                    className="user_avatar_feed"
                />

                <input
                    type="text"
                    className="feed_input"
                    placeholder="Create post"
                />
            </div>

            <span style={{paddingLeft:"58px"}}><PostBottomButtons /></span>
        </div>
    );  
};



export default CreatePostFeed