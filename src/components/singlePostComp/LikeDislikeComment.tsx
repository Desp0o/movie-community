import React, { useEffect, useState } from "react";
// import { arrowDislike } from "../../assets/svg/arrowDislike";
// import { arrowLike } from "../../assets/svg/arrowLike";
import { commentsIcon } from "../../assets/svg/commentsIcon";
import "./singlePostComp.css";
// import { activeLike } from "../../assets/svg/activeLike";
// import { activeDislike } from "../../assets/svg/activeDislike";
import { useUserHook } from "../../hooks/useUserHook";
import { useDispatch } from "react-redux";
import { setModalVisible } from "../../Redux/loginModalSlicer";
import { activeHeartIcon, heartIcon } from "../../assets/svg/heartIcon";
import { Guling, UnGuling } from "./likeFunction/GulingFuction";
// import { DislikeFunction, Liking, UnDislikeFunction, Unliking } from "./likeFunction/LikeFunctions";

interface LikeDislikeCommentProps {
  likes: number;
  dislikes: number;
  postID: number;
  authLike: string;
  commentLength: number;
  authGul: number;
  gul: number;
}

const LikeDislikeComment: React.FC<LikeDislikeCommentProps> = ({
  // likes,
  // dislikes,
  postID,
  // authLike,
  commentLength,
  authGul,
  gul
}) => {
  const dispatch = useDispatch();
  const { user } = useUserHook();
  const [votes, seteVotes] = useState(Number(gul));
const [isHeart, setHeart] = useState(authGul === 0 ? false : true)
const [gulIcon, setGulIcon] = useState(authGul === 0 ? heartIcon : activeHeartIcon)

useEffect(() => {
  seteVotes(Number(gul));
}, [gul]);

useEffect(()=>{
  if(!user.userID){
    setHeart(false)
    setGulIcon(heartIcon)
  }

  // console.log(typeof votes + ('12'));
  
},[user.userID])


  useEffect(()=>{
    if(authGul === 0 && user.userID){
      setHeart(false)
      setGulIcon(heartIcon)
    }

    if(authGul === 1 && user.userID){
      setHeart(true)
      setGulIcon(activeHeartIcon)
    }

    if(!user.userID){
      setHeart(false)
      setGulIcon(heartIcon)
    }

  },[user.userID, authGul])


  const sendHeart = () => {

    if(user.userID){
      if(!isHeart){
        seteVotes((prevVotes: number) => prevVotes + 1);
        setHeart(true)
        //send heart
        Guling(postID)
        setGulIcon(activeHeartIcon)
      }
  
      if(isHeart){
        //send unheart
        seteVotes((prevVotes: number) => prevVotes - 1);
        setHeart(false)

        UnGuling(postID)
        setGulIcon(heartIcon)

      }
    }else {
      dispatch(setModalVisible(true));
    }

    console.log(isHeart);
    
  }

  

  return (
    <div className="likeDislikeComment_container">
      <div className="like_dislike">
        {/* <span onClick={sendLike}>{likeEmoj.icon}</span> */}
        <span onClick={sendHeart} className="icon">{gulIcon}</span>
        <p>
          {Number(votes)}
        </p>
        {/* <span onClick={sendUnlike}>{disLikeEmoj.icon}</span> */}
      </div>

      <div className="single_post_comments">
        {commentsIcon}
        <p>{commentLength}</p>
      </div>
    </div>
  );
};

export default LikeDislikeComment;
