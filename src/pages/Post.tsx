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

interface PollProps {
  id: number;
  title: string;
}

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

  const sendPollAnswer = async (id:number) => {
    const token = localStorage.getItem('token')

   try {
    const res = await axios.get(`https://api.pinky.ge/api/pollAnswering/${id}`, {headers:{
      Authorization: `Bearer ${token}`
    }})

    console.log(res);
    
   } catch (error) {
    console.error(error)
   }

    
  }
  

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
              <EditPannel postID={data?.post?.id} isInnerPage={true}/>
            </div>

            <div className="single_page_title">
              <PostTitle title={data?.post?.text} postStatus={data?.post?.status} />
            </div>

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
              {data?.post?.img && data?.post?.type === 0 && (
                <PostImage image={data?.post?.img} funName={openFullScreen} />
              ) }

              {data?.post?.img && data?.post?.type === 1 && (
                <PostVideo image={data?.post?.img} />
              ) }


            </div>

            <div className="">
              {
                pollAnswers?.map((poll: PollProps)=>{
                  return(
                    <p key={poll.id} onClick={()=>sendPollAnswer(poll.id)}> {poll.title} </p>
                  )
                })
              }
            </div>

            <LikeDislikeComment
              likes={data?.post?.like}
              dislikes={data?.post?.dislike}
              postID={data?.post?.id}
              authLike={data?.post?.authLike}
              commentLength={data?.post?.comment} authGul={data?.post?.authGul} 
              gul={data?.post?.gul}              
              />

            <AddComment postID={id} callBack={refetch}/>

            {Number(data.comment) > 0 ? <CommentsSection fetchedComments={commData} callback={refetch}/> : <></>}
            
          </div>
        </>
      ) : (
        <p>post not found</p>
      )}
    </div>
  );
};

export default Post;
