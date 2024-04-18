import React, { useEffect, useState } from "react";
import "./singlePostComp.css";
import Author from "./Author";
import PostTitle from "./PostTitle";
import PostImage from "./postImage";
import { useDarkModeHook } from "../../hooks/useDarkModeHook";
import LikeDislikeComment from "./LikeDislikeComment";
import "./singlePostComp.css"
import SeeMore from "./SeeMore";
import PostVideo from "./postVideo";
import { useUserHook } from "../../hooks/useUserHook";
import 'react-toastify/dist/ReactToastify.css';
import EditPannel from "./EditPannel";


interface SinglePostProps {
  authorName: string;
  authorAvatar: string;
  postTitle: string;
  image?: string;
  postID: number;
  likes: number;
  dislikes: number;
  type: string | number;
  authLike: string;
  date: string;
  postUserId:number;
  postStatus:string | number;
  commentLength: number;
}

const SinglePostComp: React.FC<SinglePostProps> = ({
  authorName,
  authorAvatar,
  postTitle,
  image,
  postID,
  likes,
  dislikes,
  type,
  authLike,
  date,
  postUserId,
  postStatus,
  commentLength
}) => {
  const [isUserLogged, setUserLoged] = useState(false)
  const {user} = useUserHook()
  const { isDark } = useDarkModeHook()


  useEffect(()=>{
    if(Number(user.userID) === postUserId){
      setUserLoged(true)
    }else{
      setUserLoged(false)
    }
  },[user, isUserLogged, postUserId])

  return (
    <>
    <div className="post_borders">
        
        <div className={isDark ? "single_post_comp dark" : "single_post_comp"}>
          <div className="author_pannel_container">
          <Author avatar={authorAvatar} name={authorName} date={date} />
            {isUserLogged ? <EditPannel postID={postID}/> : <></>}
          </div>
          <PostTitle title={postTitle} postStatus={postStatus} />
      
          {type === "0"
            ? (image ? <PostImage image={image} /> : <></>)
            : type === "1" ?
            (image ? <PostVideo image={image} /> : <></>)
            : <></>
          }

          <LikeDislikeComment likes={likes} dislikes={dislikes} postID={postID} authLike={authLike} commentLength={commentLength} />
        
          <SeeMore postID={postID} />
        </div>
        
      </div>
    </>
    
  );
};

export default SinglePostComp;
