import { useParams } from "react-router-dom";
import Author from "../components/singlePostComp/Author";
import PostImage from "../components/singlePostComp/postImage";
import React, { useEffect, useState } from "react";
import axios from "axios";
import EditPannel from "../components/singlePostComp/EditPannel";
import PostVideo from "../components/singlePostComp/postVideo";
import { useQuery } from "react-query";
import { useUserHook } from "../hooks/useUserHook";
// import ScrollToTop from "../components/scrollToTop/ScrollToTop";
import Spinner from "../components/spinner/Spinner";
// import Poll from "../components/singlePostComp/Poll";
// import AnswerQuizComp from "../components/singlePostComp/AnswerQuizComp";
import PageLayout from "../components/pageLayout/PageLayout";

import "./post.css"
import LikeCommentShare from "../components/singlePostComp/LikeCommentShare";
import BookmarkPost from "../components/singlePostComp/BookmarkPost";


const Post = () => {
  const token = localStorage.getItem('token')
  // const imageStoragePath = import.meta.env.VITE_IMAGE_PATH;

  // const [isFullScreenImage, setFullScreenImage] = useState(false);
  const { id } = useParams();
  // const [commData, setComData] = useState([])
  // const [pollAnswers, setPollAnswer] = useState([])
  const { user } = useUserHook()
  const [commentValue, setCommentValue] = useState<{
    img: File | undefined;
    text: string;
  }>({
    img: undefined,
    text: "",
  });  const [isFaded, setFaded] = useState(true)
  // const openFullScreen = () => {
  //   setFullScreenImage(true);
  //   document.body.style.overflow = "hidden";
  // };

  // const closeFullScreen = () => {
  //   setFullScreenImage(false);
  //   document.body.style.overflow = "auto";
  // };


  //checking comment value legth for button behavior
  useEffect(()=>{
    if(commentValue.text.length > 0){
      setFaded(false)
    }else{
      setFaded(true)
    }
  },[commentValue])

  

  const [path, setPath] = useState(import.meta.env.VITE_SINGLE_GUEST_POST)
  useEffect(() => {
    if (user.name) {
      setPath(import.meta.env.VITE_SINGLE_AUTH_POST)
    } else {
      setPath(import.meta.env.VITE_SINGLE_GUEST_POST)
    }
  }, [user])

  const { data, isError, error, refetch, isLoading } = useQuery(
    [`single-post`, path],
    async () => {
      const response = await axios.get(`${path}${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // setComData(response.data.comments);
      // setPollAnswer(response.data.polls)
      return response.data;
    }, {
    cacheTime: 0,
  }
  );

  const sendComment = async () => {
    const token = localStorage.getItem('token')

    if(!isFaded){
      try {
        const res = await axios.post(`${import.meta.env.VITE_ADD_COMMENT}${id}`, commentValue, {
          headers:{
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data, application/json, text/plain, */*"
          }
        } )
        console.log(res.data);
        refetch()
      } catch (error) {
        console.log(error)
      }
    }
  }

  if (isError) {
    console.error(error)
  }


  if (data) {
    console.log(data.post);

  }

  if (isLoading) {
    return <Spinner />
  }


  return (
    <PageLayout>
      <div className="post_page">
        <div className="post_page_inner">
          <EditPannel postID={data?.post?.id} type={data?.post?.type} />

          <div className="author_title_media">
            <div className="post_page_inner_block1">
              <Author avatar={data?.post?.user?.avatar} name={data?.post?.user?.name} date={data?.post?.created_at} />
              <BookmarkPost mySave={data.post.mySave} postID={data.post.id} />
            </div>

            <p className="post_page_inner_block1_title">{data?.post.text}</p>

            {
              data?.post?.img &&
              <div className="media_cont">
                {data.post.type === 1 && <PostImage image={data.post.img} type={data.post.type} />}
                {data.post.type === 0 && <PostVideo image={data.post.img} />}
              </div>
            }

            <LikeCommentShare
              postID={data.post.id}
              commentLength={data.post.comments}
              refetchCallBack={refetch}
              guls={data.post.guls}
              authGul={data.post.myGul}
            />
          </div>

          <div className="comments_section">
          
            <div className="write_comment">
              <Author avatar={user.avatar} />
              <input 
                value={commentValue.text} 
                placeholder="Write comment..."
                className="write_comment_input" 
                alt="comment input" 
                onChange={(e)=>setCommentValue({...commentValue, text: e.target.value})}
              />

              <span onClick={sendComment}><CommentBtn faded={isFaded} /></span>
            </div>
          </div>
        </div>

        
      </div>
    </PageLayout>
  );
};

export default Post;


interface CommentBtnProps {
  faded: boolean;
}
const CommentBtn:React.FC<CommentBtnProps> = ({faded}) =>{
  return(
    <div className={faded ? "comment_btn" : "comment_btn active"}>
      <p>Add comment</p>
  </div>
  )
}