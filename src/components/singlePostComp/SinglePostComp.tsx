import React, { useEffect, useState } from "react";
import "./singlePostComp.css";
import Author from "./Author";
import PostTitle from "./PostTitle";
import PostImage from "./postImage";
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
import StandartQuizComponent from "./StandartQuizComponent";
import IconBlock from "./IconBlock";
import { likeIcon } from "../../assets/newSvg/likeIcon";


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
  mySave: number;
  pollAnswers:[]
  myAnswer: number | null
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<unknown, unknown>>;
}

const SinglePostComp: React.FC<SinglePostProps> = ({
  myAnswer,
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
  pollAnswers,
  mySave
}) => {
  const [isUserLogged, setUserLoged] = useState(false)
  const {user} = useUserHook()


  useEffect(()=>{
    if(Number(user.userID) === postUserId){
      setUserLoged(true)
    }else{
      setUserLoged(false)
    }
  },[user, isUserLogged, postUserId])
  

  return (
    <>
        
        {
          type !== 5 
          ?
          //აქ არის ყველა პოსტი ქვიზის გარდა
            <div className="single_post_comp">

                  {isUserLogged ? <EditPannel postID={postID} type={type}/> : <></>}

                <div className="author_pannel_container">
                  <Author avatar={authorAvatar} name={authorName} date={date} />
                  <div className="like_post_icon">
                    <IconBlock icon={likeIcon} quantity={guls ? guls : 0} width={48}/>  
                  </div>             
                </div>
                
                {/* title */}
              <Link to={`/pages/Post/${postID}`} className="post_title">
                <PostTitle title={postTitle} postStatus={postStatus} image={image}/>
              </Link>
            
            {/* picture or image */}
              {type !== 0
                ? (image ? <Link to={`/pages/Post/${postID}`} className="post_media_conatiner"><PostImage type={type} image={image} /></Link> : <></>)
                : type === 0 ?
                (image ? <Link to={`/pages/Post/${postID}`} className="post_media_conatiner"><PostVideo image={image} /> </Link>: <></>)
                : <></>
              }
              
              {type === 3 && <Poll pollAnswers={pollAnswers} refetch={refetch} data={myPoll} />  }

              {!myAnswer && myAnswer !== null && type === 4 ? <AnswerQuizComp id={postID} /> : <></> }

              {
                type !== 4 
                &&
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
                mySave={mySave}
              />
              }
            </div>
          :
          //ქვიზის პოსტი
            <StandartQuizComponent />
        }
        
    </>
    
  );
};

export default SinglePostComp;
