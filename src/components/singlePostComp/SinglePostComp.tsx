import React, { useEffect, useState } from "react";
import "./singlePostComp.css";
import Author from "./Author";
import PostTitle from "./PostTitle";
import PostImage from "./postImage";
import { shareIcon } from "../../assets/newSvg/shareIcon";
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
import { likeIcon, likeIconFilled } from "../../assets/newSvg/likeIcon";
import { commentsIcon, commentsIconFilled } from "../../assets/newSvg/commentsIcon";
import { bookmarkIcon, bookmarkIconFilled } from "../../assets/newSvg/bookmarkIcon";
import { GulingFuction } from "./likeFunction/GulingFuction";
import { useSavePost } from "./likeFunction/SaveFunction";


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
  type,
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
  const { Guling } = GulingFuction();
  const { mutate } = useSavePost();
  const [commentIcon, setCommentIcon] = useState(commentLength !== 0 ? commentsIconFilled : commentsIcon) //comments icon

  //post like states
  const [heartIcon, setHeartIcon] = useState(authGul === 1 ? likeIconFilled : likeIcon) //like icon
  const [isHeartClicked, setHeartClicked] = useState(authGul === 1 ? true : false) //like icon active/inactvie indicator
  const [likeCount, setLikeCount] = useState(guls ? guls : 0)

  //bookmark states
  const [saveIcon, setSaveIcon] = useState(mySave === 1 ? bookmarkIconFilled : bookmarkIcon)
  const [bookmarkActive, setBookmarkActive] = useState(mySave === 1 ? true : false)

  //fot geth authGul is true or not
  useEffect(()=>{
    if(Number(user.userID) === postUserId){
      setUserLoged(true)
    }else{
      setUserLoged(false)
    }
  },[user, isUserLogged, postUserId])
  
  //like post and set icon active/inactive incr/decr votes
  const likingPost = () => {
    if(user.userID && user.name){
      Guling(postID)
      setHeartClicked(!isHeartClicked)

      if(isHeartClicked){
        setHeartIcon(likeIcon)
        setLikeCount((prev) => prev - 1)
      }else{
        setHeartIcon(likeIconFilled)
        setLikeCount((prev) => prev + 1)
      }
    }
  }

  //update heart icon on authGul change
  useEffect(()=>{
    if (authGul === 0) {
      setHeartIcon(likeIcon)
      setHeartClicked(false)
    }

    if (authGul === 1) {
      setHeartIcon(likeIconFilled)
      setHeartClicked(true)
    }
  },[authGul])


  //update comment icon on commentLength change
  useEffect(()=>{
    if (commentLength !== 0) {
      setCommentIcon(commentsIconFilled)
    }

    if (commentLength === 0) {
      setCommentIcon(commentsIcon)
    }

    refetch()
  },[commentLength])


  //save in bookmark function
  const saveInBookMark =() => {
    mutate(postID)
    setBookmarkActive(!bookmarkActive)

    if(bookmarkActive){
      setSaveIcon(bookmarkIcon)
    }else{
      setSaveIcon(bookmarkIconFilled)
    }
  }

  //update bookmark icon change
  useEffect(()=>{
    if(mySave === 1){
      setSaveIcon(bookmarkIconFilled)
      setBookmarkActive(true)
    }else{
      setSaveIcon(bookmarkIcon)
      setBookmarkActive(false)
    }
  },[mySave])


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
                    <span onClick={likingPost}><IconBlock icon={heartIcon} quantity={likeCount} width={48}/></span>  
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
              <div className="post_bottom_icons">
                  <div className="post_commens_share_icons">
                    <Link to={`/pages/Post/${postID}`}><IconBlock icon={commentIcon} quantity={commentLength} width={48} /></Link>
                    <IconBlock icon={shareIcon} />
                  </div> 

                  <span onClick={saveInBookMark}>
                    <IconBlock icon={saveIcon} />
                  </span>
              </div>
              
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
