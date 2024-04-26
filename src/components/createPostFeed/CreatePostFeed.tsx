import { useState } from "react"
import { addMediaIocn } from "../../assets/svg/addMediaIcon"
import { pollIcon } from "../../assets/svg/poolIcon"
import { quizFeedIocn } from "../../assets/svg/quizFeedIcon"
import { useUserHook } from "../../hooks/useUserHook"
import "./CreatePostFeed.css"
import PostStyle from "./PostStyle"


const CreatePostFeed = () => {
    const { user } = useUserHook();
    const [inputValue, setInputValue] = useState('')

    const handleChange = (event: { target: { style: { height: string }; scrollHeight: any , value: string} }) => {
        event.target.style.height = "44px";
        event.target.style.height = `${event.target.scrollHeight}px`;
        
        setInputValue(event.target.value)
    };

    return (
        <div className="CreatePostFeed">
            <div className="user_avatar_input">
                <img
                    src={user.avatar}
                    alt="user avatar"
                    className="user_avatar_feed"
                />

                <textarea
                    className="feed_input"
                    placeholder="Create post"
                    value={inputValue}
                    onChange={handleChange}
                />
            </div>

            <div className="choose_post_style">
                <PostStyle styleName={"Photo/video"} styleIocn={addMediaIocn} />
                <PostStyle styleName={"Quiz"} styleIocn={quizFeedIocn} />
                <PostStyle styleName={"Poll"} styleIocn={pollIcon} />
            </div>
        </div>
    );
};



export default CreatePostFeed