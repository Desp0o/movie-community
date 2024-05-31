import React, { useState } from "react";
import { useUserHook } from "../../hooks/useUserHook";
import noAvatar from "../../assets/noAvatar.jpeg"
// import { deleteComment } from "./DELcomment";
// import { editComment } from "./EDITcomment";
import Author from "../singlePostComp/Author";
import { heartIcon } from "../../assets/svg/heartIcon";
import { dotsIcons } from "../../assets/svg/dotsIcons";
import { deleteComment } from "./DELcomment";

interface Comment {
  [x: string]: any;
  id: number;
  text: string;
  img: string;
  user_id:string
}

interface ComProps {
  fetchedComments: Comment[];
  callback:()=>void
}

// callback
const CommentsSection: React.FC<ComProps> = ({ fetchedComments, callback  }) => {
  // const imageStoragePath = import.meta.env.VITE_COMMENT_IMAGE;
  const {user} = useUserHook()

  const [isSettingVisible, setSettingVisible] = useState(false)
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);

  const handleSetting = () => {
    setSettingVisible(!isSettingVisible)
  }
  

  const replay = (index:number | null)=>{
    if(index === clickedIndex){
      setClickedIndex(null)

    }else{
      setClickedIndex(index)

    }
  }

  return (
    <div style={{display:"flex" , flexDirection:"column", gap:"30px"}}>
      {fetchedComments?.map((item, index) => (
        <div key={item.id} className="single_posted_comment">
          {/* avatar */}
          <img src={item.user.avatar ? item?.user?.avatar : noAvatar} alt="user vatar" className="comment_user_avatar" />
          
          {/* name comment like replay */}
          <div className="comment_authorname_time">
            <Author name={item.user.name} date={item.created_at} />
            <p className="comment_text">{item.text}</p>

            {Number(user.userID) === Number(item.user_id) && <span onClick={handleSetting} className="comment_dots">{dotsIcons}</span>}
            
            {
              isSettingVisible && 
              <div className="post_setting_pannel">
                <p onClick={() => deleteComment(item.id, callback)}> delete </p>
              </div>
            }

            {/* comment likes */}
            <div className="like_comment_">
                <span className="comment_heart_icon">{heartIcon}</span>
                <span style={{height:"14px", borderRight:"1px solid #CCD4DE"}}/>
                <p className="replay" onClick={()=>replay(index)}>Replay</p>
                {index === clickedIndex ? "pot" : <></>}
            </div>

          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentsSection;
