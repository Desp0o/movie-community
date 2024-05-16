import React, { useEffect, useState } from "react";
import "./singlePostComp.css";
import Author from "./Author";
import PostTitle from "./PostTitle";
import PostImage from "./postImage";
import { useDarkModeHook } from "../../hooks/useDarkModeHook";
import LikeDislikeComment from "./LikeDislikeComment";
import "./singlePostComp.css"
import PostVideo from "./postVideo";
import { useUserHook } from "../../hooks/useUserHook";
import 'react-toastify/dist/ReactToastify.css';
import EditPannel from "./EditPannel";
import { Link } from "react-router-dom";
import PostPollQuest from "./PostPollQuest";
import AnswerQuizComp from "./AnswerQuizComp";


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
  authGul?: number;
  gul?: number;
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
  commentLength,
  authGul,
  gul
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
        
        <div className={isDark ? "single_post_comp dark" : "single_post_comp"}>

            <div className="autor_title_image_">
              {/* author name date paneledit */}
            <div className="author_pannel_container">
              <Author avatar={authorAvatar} name={authorName} date={date} />
              {isUserLogged ? <EditPannel postID={postID}/> : <></>}
            </div>
            
            {/* title */}
          <Link to={`/pages/Post/${postID}`} className="post_title"><PostTitle title={postTitle} postStatus={postStatus} /></Link>
         
         {/* picture or image */}
          {type === 0
            ? (image ? <Link to={`/pages/Post/${postID}`} className="post_media_conatiner"><PostImage image={image} /></Link> : <></>)
            : type === 1 ?
            (image ? <Link to={`/pages/Post/${postID}`} className="post_media_conatiner"><PostVideo image={image} /> </Link>: <></>)
            : type === 3 ? <PostPollQuest /> :<></>
          }
          
            </div>

          <AnswerQuizComp />
          <LikeDislikeComment likes={likes} dislikes={dislikes} postID={postID} authLike={authLike} commentLength={commentLength} authGul={authGul ? authGul : 0} gul={gul ? gul : 0} pathToSinglePost={postID} />
          

        </div>
        
    </>
    
  );
};

export default SinglePostComp;
