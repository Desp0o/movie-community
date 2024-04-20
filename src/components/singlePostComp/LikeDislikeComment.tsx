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
  guls: number;
}

const LikeDislikeComment: React.FC<LikeDislikeCommentProps> = ({
  // likes,
  // dislikes,
  postID,
  // authLike,
  commentLength,
  authGul,
  guls
}) => {
  const dispatch = useDispatch();
  const { user } = useUserHook();
  const [votes, seteVotes] = useState(Number(guls));
const [isHeart, setHeart] = useState(authGul === 0 ? false : true)
const [gulIcon, setGulIcon] = useState(authGul === 0 ? heartIcon : activeHeartIcon)

useEffect(()=>{
  if(!user.userID){
    setHeart(false)
    setGulIcon(heartIcon)
  }
},[user.userID])

  // const [likeEmoj, setLikeEmoj] = useState({
  //   active: authLike === "like" ? true : false,
  //   icon: authLike === "like" ? activeLike : arrowLike,
  // });

  // const [disLikeEmoj, setDislikeEmoj] = useState({
  //   active: authLike === "dislike" ? true : false,
  //   icon: authLike === "dislike" ? activeDislike : arrowDislike,
  // });

  // useEffect(() => {
  //   seteVotes(likes - dislikes);
  // }, [likes, dislikes]);

  // const [isLike] = useState({
  //   post: postID,
  //   like: "like",
  // });
  // const [isUnlike] = useState({
  //   post: postID,
  //   like: "dislike",
  // });

  // useEffect(() => {
  //   if (user.name !== "" && authLike === "like") {
  //     setLikeEmoj({ active: true, icon: activeLike });
  //     setDislikeEmoj({ active: false, icon: arrowDislike });
  //   }

  //   if (user.name !== "" && authLike === "dislike") {
  //     setLikeEmoj({ active: false, icon: arrowLike });
  //     setDislikeEmoj({ active: true, icon: activeDislike });
  //   }

  //   if (user.name !== "" && authLike === null) {
  //     setLikeEmoj({ active: false, icon: arrowLike });
  //     setDislikeEmoj({ active: false, icon: arrowDislike });
  //   }

  //   if (user.name === "" && authLike === undefined) {
  //     setLikeEmoj({ active: false, icon: arrowLike });
  //     setDislikeEmoj({ active: false, icon: arrowDislike });
  //   }

  //   if (!user.name && !user.userID) {
  //     setLikeEmoj({ active: false, icon: arrowLike });
  //     setDislikeEmoj({ active: false, icon: arrowDislike });
  //   }
  //   // eslint-disable-next-line
  // }, [user.name, authLike, user.userID]);



  // const sendLike = async () => {
  //   if (user.userID) {
  //     if (!likeEmoj.active) {
  //       setLikeEmoj({ active: true, icon: activeLike });
  //       setDislikeEmoj({ active: false, icon: arrowDislike });        
  //       seteVotes(votes + 1); // add vote
  //       Liking(isLike)

  //       if (disLikeEmoj.active) {
  //         UnDislikeFunction(isUnlike)
  //         seteVotes(votes + 2);
  //       }
  //     } else {
  //       setLikeEmoj({ active: false, icon: arrowLike })
  //       seteVotes(votes - 1);
  //       Unliking(isLike)
  //     }
  //   } else {
  //     dispatch(setModalVisible(true));
  //   }
  // };



  // const sendUnlike = async () => {
  //   if (user.userID) {
  //     if (!disLikeEmoj.active) {
  //       setLikeEmoj({ active: false, icon: arrowLike });
  //       setDislikeEmoj({ active: true, icon: activeDislike });

  //       seteVotes(votes - 1)

  //       if (likeEmoj.active) {
  //         Unliking(isLike)

  //         seteVotes(votes - 2);
  //       }
  //       DislikeFunction(isUnlike)
  //     } else {
  //       setDislikeEmoj({ active: false, icon: arrowDislike });

  //       seteVotes(votes + 1)
  //       UnDislikeFunction(isUnlike)
  //     }
  //   } else {
  //     dispatch(setModalVisible(true));
  //   }
  // };

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

  },[user.userID, guls, authGul])


  const sendHeart = () => {
    setHeart(!isHeart)
    if(user.userID){
      if(!isHeart){
        //send heart
        seteVotes(votes + 1);
        Guling(postID)
        setGulIcon(activeHeartIcon)
      }
  
      if(isHeart){
        //send unheart
        seteVotes(votes - 1);
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
        <span onClick={sendHeart}>{gulIcon}</span>
        <p>
          {votes}
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
