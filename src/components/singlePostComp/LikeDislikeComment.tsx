import React, { useEffect, useState } from "react";
import { commentsIcon } from "../../assets/svg/commentsIcon";
import "./singlePostComp.css";
import { useUserHook } from "../../hooks/useUserHook";
import { useDispatch } from "react-redux";
import { setModalVisible } from "../../Redux/loginModalSlicer";
import { activeHeartIcon, heartIcon } from "../../assets/svg/heartIcon";
import { GulingFuction } from "./likeFunction/GulingFuction";
import { shareIcon } from "../../assets/svg/shareIcon";
import { filledSaveIcon, saveIcon } from "../../assets/svg/saveIcon";
import IconContainer from "./IconContainer";
import { Link } from "react-router-dom";
import { useSavePost } from "./likeFunction/SaveFunction";

interface LikeDislikeCommentProps {
  likes: number;
  dislikes: number;
  postID: number;
  authLike: string;
  commentLength: number;
  authGul: number;
  gul: number;
  pathToSinglePost?: number;
  type?:number | string;
  mySave: number;
}

const LikeDislikeComment: React.FC<LikeDislikeCommentProps> = ({
  postID,
  commentLength,
  authGul,
  gul,
  pathToSinglePost,
  type,
  mySave
}) => {
  const dispatch = useDispatch();
  const { Guling } = GulingFuction();
  // const { Guling, ungGulingError, gulingError } = GulingFuction();
  const { user } = useUserHook();
  const [votes, seteVotes] = useState(Number(gul));
  const [isHeart, setHeart] = useState(authGul === 0 ? false : true);
  const [gulIcon, setGulIcon] = useState(
    authGul === 0 ? heartIcon : activeHeartIcon
  );

  const { mutate } = useSavePost();

  const handleSavePost = () => {
    mutate(postID);
};

  useEffect(() => {
    seteVotes(Number(gul));
  }, [gul]);

  useEffect(() => {
    // if not user deactivate
    if (!user.userID) {
      setHeart(false);
      setGulIcon(heartIcon);
    }
  }, [user.userID]);

  useEffect(() => {
    if (authGul === 0 && user.userID) {
      setHeart(false);
      setGulIcon(heartIcon);
    }

    if (authGul === 1 && user.userID) {
      setHeart(true);
      setGulIcon(activeHeartIcon);
    }

    if (!user.userID) {
      setHeart(false);
      setGulIcon(heartIcon);
    }
  }, [user.userID, authGul]);



  const sendHeart = () => {
    if (!user.userID) {
      dispatch(setModalVisible(true));
      return;
    }

    // if(ungGulingError || gulingError){
    //   // window.location.reload();
      
    //   return
    // }

    if (!isHeart) {
      seteVotes((prevVotes) => prevVotes + 1);
      setHeart(true);
      setGulIcon(activeHeartIcon);
      Guling(postID);
    }

    if (isHeart) {
      seteVotes((prevVotes) => prevVotes - 1);
      setHeart(false);
      setGulIcon(heartIcon);
      Guling(postID);
    }

  };

  return (
    <div className="likeDislikeComment_container">
      <div className="like_comment_share">
        {/* like */}
        <IconContainer
          funcName={sendHeart}
          icon={gulIcon}
          number={Number(votes)}
        />

        {/* comment */}
        {
          type !== 4 && <Link to={pathToSinglePost ? `pages/Post/${pathToSinglePost}` : ""}>
          <IconContainer icon={commentsIcon} number={commentLength} />
        </Link>
        }

        {/* share */}
        <IconContainer icon={shareIcon} number={0} />
      </div>

      {/* save */}
      <div className="like_container">
        <span className="icon_container_likeComp" onClick={handleSavePost}>
          {mySave === 0 ? saveIcon : filledSaveIcon}
        </span>

      </div>
    </div>
  );
};

export default LikeDislikeComment;
