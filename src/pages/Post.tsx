import { useParams } from "react-router-dom";
import PageLayout from "../components/pageLayout/PageLayout";
import GoBack from "../components/singlePostPage/GoBack";
import Author from "../components/singlePostComp/Author";
import PostTitle from "../components/singlePostComp/PostTitle";
import PostImage from "../components/singlePostComp/postImage";
import QuizAnswers from "../components/singleQuizComponent/QuizAnswers";
import "../components/singlePostPage/singlePostPage.css";
import LikeDislikeComment from "../components/singlePostComp/LikeDislikeComment";
import { useEffect, useState } from "react";
import { xIcon } from "../assets/svg/Xicon";
import AddComment from "../components/singlePostPage/AddComment";
import CommentsSection from "../components/singlePostPage/CommentsSection";
import axios from "axios";

const Post = () => {
  const [isFullScreenImage, setFullScreenImage] = useState(false);
  const { id } = useParams();
  const postId = id ? parseInt(id) : null;

  const openFullScreen = () => {
    setFullScreenImage(true);
    document.body.style.overflow ='hidden'
  };

  const closeFullScreen = () => {
    setFullScreenImage(false);
    document.body.style.overflow ='auto'
  };

  useEffect(()=>{
    const requestSInglePost = async () => {
      try {
          const response  = await axios.get(`${import.meta.env.VITE_SINGLE_POST}${id}`)
          console.log(response);
          
      } catch (error) {
        
      }
    }
    requestSInglePost()

  },[])


  return (
    <div>
      <PageLayout>
        {/* <div className="single_post_page">
          <div className="goBack_authorInfo">
            <GoBack />
            <Author avatar={post.avatar} name={post.name} date={""} />
          </div>

          <div className="single_page_title">
            <PostTitle title={post.title} />
          </div>

          <div className="single_post_image">
            {isFullScreenImage ? (
              <div className="full_screen_img">
                <span className="close_full_screen_image" onClick={closeFullScreen}>{xIcon}</span>
                <img src={post.image} className="full_screen_cover" alt="full screen cover"/>
                <img src={post.image} className="full_screen_photo" alt="full screen photo"/>
              </div>
            ) : (
              <></>
            )}
            {post.image ? (
              <PostImage image={post.image} funName={openFullScreen} />
            ) : (
              <></>
            )}
          </div>

          {post.type === 1 ? (
            <div className="answers_container">
              <QuizAnswers />
            </div>
          ) : (
            <></>
          )}

          <LikeDislikeComment likes={0} dislikes={0} postID={0} authLike={""} />

          <AddComment />

          <CommentsSection />
        </div> 

        <p>asd</p> */}

        {id}
      </PageLayout>
    </div>
  );
};

export default Post;
