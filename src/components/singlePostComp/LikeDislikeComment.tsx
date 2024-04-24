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
import { shareIcon } from "../../assets/svg/shareIcon";
import { saveIcon } from "../../assets/svg/saveIcon";
import IconContainer from "./IconContainer";
import { FeedFunctions } from "../feedFuncs/FeedFucntions";
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
  const {refetch} = FeedFunctions()
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
    if (!user.userID) {
      dispatch(setModalVisible(true));
      return;
    }

    if (!isHeart) {
      seteVotes((prevVotes) => prevVotes + 1);
      setHeart(true);
      setGulIcon(activeHeartIcon);

      // Optimistic update
      Guling(postID)
        .then(() => {
          // Data mutation successful
          refetch();
        })
        .catch((error) => {
          // Handle error
          console.error("Error occurred:", error);
          // Rollback optimistic update
          seteVotes((prevVotes) => prevVotes - 1);
          setHeart(false);
          setGulIcon(heartIcon);
        });
    } else {
      seteVotes((prevVotes) => prevVotes - 1);
      setHeart(false);
      setGulIcon(heartIcon);

      // Optimistic update
      UnGuling(postID)
        .then(() => {
          // Data mutation successful
          refetch();
        })
        .catch((error) => {
          // Handle error
          console.error("Error occurred:", error);
          // Rollback optimistic update
          seteVotes((prevVotes) => prevVotes + 1);
          setHeart(true);
          setGulIcon(activeHeartIcon);
        });
    }
  };

  return (
    <div className="likeDislikeComment_container">
      <div className="like_comment_share">       
        {/* like */}
        <IconContainer funcName={sendHeart} icon={gulIcon} number={Number(votes)} />

        {/* share */}
        <IconContainer icon={commentsIcon} number={commentLength} />


        {/* share */}
        <IconContainer icon={shareIcon} number={0} />

      </div>

      {/* save */}
      <div className="like_container">
          <span className="icon_container_likeComp">{saveIcon}</span>
        </div>
    </div>
  );
};

export default LikeDislikeComment;
