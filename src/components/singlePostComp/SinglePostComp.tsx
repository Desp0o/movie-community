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
import Poll from "./Poll";
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from "react-query";
import AnswerQuizComp from "./AnswerQuizComp";


interface SinglePostProps {
  myPoll: number;
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
  guls?: number;
  data?: number;
  pollAnswers:[]
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<any, unknown>>;
}

const SinglePostComp: React.FC<SinglePostProps> = ({
  authorName,
  myPoll,
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
  guls,
  refetch,
  pollAnswers
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
          <Link to={`/pages/Post/${postID}`} className="post_title">
            <PostTitle title={postTitle} postStatus={postStatus} />
          </Link>
         
         {/* picture or image */}
          {type !== 0
            ? (image ? <Link to={`/pages/Post/${postID}`} className="post_media_conatiner"><PostImage type={type} image={image} /></Link> : <></>)
            : type === 0 ?
            (image ? <Link to={`/pages/Post/${postID}`} className="post_media_conatiner"><PostVideo image={image} /> </Link>: <></>)
            : <></>
          }
          
          {type === 3 && <Poll pollAnswers={pollAnswers} refetch={refetch} data={myPoll} />  }
          {type === 4 && <AnswerQuizComp id={postID} />  }
          </div>


          <LikeDislikeComment 
            type={type} 
            likes={likes} 
            dislikes={dislikes} 
            postID={postID} 
            authLike={authLike} 
            commentLength={commentLength} 
            authGul={authGul ? authGul : 0} 
            gul={guls ? guls : 0} 
            pathToSinglePost={postID} 
          />
          

        </div>
        
    </>
    
  );
};

export default SinglePostComp;
