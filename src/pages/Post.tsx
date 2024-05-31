import { useParams } from "react-router-dom";
import GoBack from "../components/singlePostPage/GoBack";
import Author from "../components/singlePostComp/Author";
import PostTitle from "../components/singlePostComp/PostTitle";
import PostImage from "../components/singlePostComp/postImage";
import "../components/singlePostPage/singlePostPage.css";
import LikeDislikeComment from "../components/singlePostComp/LikeDislikeComment";
import { useEffect, useState } from "react";
import { xIcon } from "../assets/svg/Xicon";
import AddComment from "../components/commenting/AddComment";
import CommentsSection from "../components/commenting/CommentsSection";
import axios from "axios";
import EditPannel from "../components/singlePostComp/EditPannel";
import PostVideo from "../components/singlePostComp/postVideo";
import { useQuery } from "react-query";
import { useUserHook } from "../hooks/useUserHook";
import ScrollToTop from "../components/scrollToTop/ScrollToTop";
import Spinner from "../components/spinner/Spinner";
import Poll from "../components/singlePostComp/Poll";
import AnswerQuizComp from "../components/singlePostComp/AnswerQuizComp";


const Post = () => {
  const token = localStorage.getItem('token')
  const imageStoragePath = import.meta.env.VITE_IMAGE_PATH;

  const [isFullScreenImage, setFullScreenImage] = useState(false);
  const { id } = useParams();
  const [commData, setComData] = useState([])
  const [pollAnswers, setPollAnswer] = useState([])
  const {user} = useUserHook()

  const openFullScreen = () => {
    setFullScreenImage(true);
    document.body.style.overflow = "hidden";
  };

  const closeFullScreen = () => {
    setFullScreenImage(false);
    document.body.style.overflow = "auto";
  };

  const [path, setPath] = useState(import.meta.env.VITE_SINGLE_GUEST_POST)
  useEffect(()=>{
    if(user.userID){
      setPath(import.meta.env.VITE_SINGLE_AUTH_POST)
    }else{
      setPath(import.meta.env.VITE_SINGLE_GUEST_POST)
    }
  },[user])

  const { data, isError, error, refetch, isLoading } = useQuery(
    [`single-post`, path],
    async () => {
      const response = await axios.get(`${path}${id}`,{
        headers:{
          Authorization: `Bearer ${token}`
        }
      });
      setComData(response.data.comments);
      setPollAnswer(response.data.polls)
      return response.data; 
    },{
      cacheTime:0,
    }
  );  

console.log(data);

  
  // useEffect(()=>{
  //   refetch()    
  // },[requestRefetch])

  if(isError){
    console.error(error)
  }

  
  
  if(isLoading){
    return <Spinner />
  }

  return (
    <div style={{paddingBottom:"30px"}}>
      
      <ScrollToTop />
      {data ? (
        <>
        <GoBack />
          <div className="single_post_page">
            <div className="goBack_authorInfo_container">
              <div className="goBack_authorInfo">
                
                <Author
                  avatar={data?.post?.user?.avatar}
                  name={data?.post?.user?.name}
                  date={data?.post?.created_at}
                />
              </div>
              <EditPannel postID={data?.post?.id} isInnerPage={true} type={data?.post?.type}/>
            </div>

            <div className="single_page_title">
              <PostTitle title={data?.post?.text} postStatus={data?.post?.status} page="inner" />
            </div>

            {
              data?.post?.img && 
              
              <div className="single_post_image">
              {isFullScreenImage ? (
                <div className="full_screen_img">
                  <span
                    className="close_full_screen_image"
                    onClick={closeFullScreen}
                  >
                    {xIcon}
                  </span>
                  <div style={{backgroundColor:"black"}}
                  />
                  <img
                    src={`${imageStoragePath}${data?.post?.img}.webp`}
                    className="full_screen_photo"
                    alt="full screen photo"
                  />
                </div>
              ) : (
                <></>
              )}
              {data?.post?.img && data?.post?.type !== 0 && (
                <PostImage image={data?.post?.img} funName={openFullScreen} type={data?.post?.type} />
              ) }

              {data?.post?.img && data?.post?.type === 0 && (
                <PostVideo image={data?.post?.img} />
              ) }


            </div>
            }

            {data?.post?.type === 3 && <Poll pollAnswers={pollAnswers} data={data?.post?.myPoll} refetch={refetch}/> }
            {data?.post?.type === 4 && <AnswerQuizComp id={data?.question?.feed_id} /> }

              {/* ეს არის ჩასმული ბორდერისთვის */}
              <div className="for_border_single_page" />

            <LikeDislikeComment
              likes={data?.post?.like}
              dislikes={data?.post?.dislike}
              postID={data?.post?.id}
              authLike={data?.post?.authLike}
              commentLength={data?.post?.comments} 
              authGul={data?.post?.myGul} 
              gul={data?.post?.guls}  
              type={data?.post?.type}
              mySave={data?.post?.mySave}            
              />

            {/* ხაზი პოსტსა და კომენტარის ინპუტს შორის */}
            <div className="for_border_divide_post_comments" />
            {data?.post?.type !== 4 && <AddComment postID={id} callBack={refetch}/> }
            

            {Number(data?.post?.comments) > 0 ? <CommentsSection fetchedComments={commData} callback={refetch}/> : <></>}
            
          </div>
        </>
      ) : (
        <p>post not found</p>
      )}
    </div>
  );
};

export default Post;


