import React, { useEffect, useState } from "react";
import { useUserHook } from "../../hooks/useUserHook";
import noAvatar from "../../assets/noAvatar.jpeg";
import { deleteComment } from "./DELcomment";
import axios from "axios";
import ReplayComment from "./ReplayComment";
import Author from "../singlePostComp/Author";
import { heartIcon, activeHeartIcon } from "../../assets/svg/heartIcon";
import { dotsIcons } from "../../assets/svg/dotsIcons";

interface Comment {
  [x: string]: any;
  id: number;
  text: string;
  img: string;
  user_id: string;
}

interface ComProps {
  fetchedComments: Comment[];
  callback: () => void;
}

interface ReplayProps {
  text: string;
}

// callback
const CommentsSection: React.FC<ComProps> = ({ fetchedComments, callback }) => {
  const { user } = useUserHook();

  const [isSettingVisible, setSettingVisible] = useState(false);
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  const [likedComments, setLikedComments] = useState<{ [key: number]: boolean }>({});

  const handleSetting = () => {
    setSettingVisible(!isSettingVisible);
  };

  const replay = (index: number | null) => {
    if (index === clickedIndex) {
      setClickedIndex(null);
    } else {
      setClickedIndex(index);
    }
  };

  //set myCommGul on component load
  useEffect(()=>{
    fetchedComments.map((item, index)=>{
      return(
        setLikedComments((prev) => ({...prev, [index]: item.myCommGul !== 0 ? true : false}))
      )
    })
  },[])

  //send comment like function
  const likeComment = async (id: number, index: number) => {
    const token = localStorage.getItem("token");

    // update state on click
    setLikedComments((prev) => ({ ...prev, [index]: !prev[index] }));

    if (!token) {
      console.error("No token found in localStorage");
      return;
    }

    try {
      await axios.get(`${import.meta.env.VITE_COMMENT_LIKING}${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

    } catch (error) {
      console.error("Error liking comment:", error);
    } finally {
      callback();
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
      {fetchedComments?.map((item, index) => (
        <div key={item.id} className="single_posted_comment">
          {/* avatar */}
          <img
            src={item.user.avatar ? item?.user?.avatar : noAvatar}
            alt="user avatar"
            className="comment_user_avatar"
          />

          {/* name comment like replay */}
          <div className="comment_authorname_time">
            <Author name={item.user.name} date={item.created_at} />
            <p className="comment_text">{item.text}</p>

            {Number(user.userID) === Number(item.user_id) && (
              <span onClick={handleSetting} className="comment_dots">
                {dotsIcons}
              </span>
            )}

            {isSettingVisible && (
              <div className="post_setting_pannel">
                <p onClick={() => deleteComment(item.id, callback)}>delete</p>
              </div>
            )}

            {/* comment likes */}
            <div className="like_comment_">
              <span className="comment_heart_icon" onClick={() => likeComment(item.id, index)}>
                {likedComments[index] ? activeHeartIcon : heartIcon}
              </span>
              <span style={{ height: "14px", borderRight: "1px solid #CCD4DE" }} />
              <p className="replay" onClick={() => replay(index)}>
                Replay
              </p>
              {index === clickedIndex ? (
                <ReplayComment refetchCallback={callback} setter={setClickedIndex} commentID={item.id} feedID={item.feed_id} />
              ) : null}
              
             
            </div>
            
            {/* replayed comments div */}
            {
              item.comments &&
                <div className="replayed_comments">
                    {item.comments?.map((replay: ReplayProps) => {
                      return(
                        <p>{replay.text}</p>
                      )
                    })}              
                </div>
            }
            
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentsSection;
