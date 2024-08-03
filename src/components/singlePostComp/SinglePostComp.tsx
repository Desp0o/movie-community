import React, { useEffect, useState } from "react";
import "./singlePostComp.css";
import Author from "./Author";
import PostTitle from "./PostTitle";
import PostImage from "./postImage";
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
import LikeCommentShare from "./LikeCommentShare";
import BookmarkPost from "./BookmarkPost";


interface SinglePostProps {
  myPoll: number;
  authorName: string;
  authorAvatar: string;
  postTitle: string;
  image?: string;
  postID: number;
  type: string | number;
  date: string;
  postUserId:number;
  postStatus:string | number;
  commentLength: number;
  authGul?: number;
  guls?: number;
  data?: number;
  mySave: number;
  quiz_id: number;
  pollAnswers:[];
  commentsData?: [];
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
  type,
  date,
  postUserId,
  postStatus,
  commentLength,
  authGul,
  guls,
  refetch,
  pollAnswers,
  mySave,
  quiz_id,
}) => {
  const [isUserLogged, setUserLoged] = useState(false)
  const {user} = useUserHook()

  //fot geth authGul is true or not
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
                  <BookmarkPost mySave={mySave} postID={postID} />
                              
                </div>
                
                {/* title */}
              <Link to={`/Post/${postID}`} className="post_title">
                <PostTitle title={postTitle} postStatus={postStatus} image={image}/>
              </Link>
            
            {/* picture or image */}
              {type !== 0
                ? (image ? <Link to={`/Post/${postID}`} className="post_media_conatiner"><PostImage type={type} image={image} /></Link> : <></>)
                : type === 0 ?
                (image ? <Link to={`/Post/${postID}`} className="post_media_conatiner"><PostVideo image={image} /> </Link>: <></>)
                : <></>
              }
              
              {type === 3 && <Poll pollAnswers={pollAnswers} myPoll={myPoll} />  }

              {!myAnswer && myAnswer !== null && type === 4 ? <AnswerQuizComp id={postID} /> : <></> }

              
              <LikeCommentShare 
                authGul={authGul}
                guls={guls}
                postID={postID}
                commentLength={commentLength}
                allLikes={[]}
                refetchCallBack={refetch} 
              />
            </div>
          :
          //ქვიზის პოსტი
            <StandartQuizComponent 
              postUserId={postUserId} 
              postID={postID} 
              image={image} 
              authorName={authorName} 
              date={date}
              postTitle={postTitle}
              quiz_id={quiz_id}
              avatar={authorAvatar}
            />
        }
        
    </>
    
  );
};

export default SinglePostComp;
