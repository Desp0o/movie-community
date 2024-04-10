import { useParams } from "react-router-dom";
import PageLayout from "../components/pageLayout/PageLayout";
import { feedData } from "../FeedDATA";
import GoBack from "../components/singlePostPage/GoBack";
import Author from "../components/singlePostComp/Author";
import PostTitle from "../components/singlePostComp/PostTitle";
import PostImage from "../components/singlePostComp/postImage";
import QuizAnswers from "../components/singleQuizComponent/QuizAnswers";
import "../components/singlePostPage/singlePostPage.css";
import LikeDislikeComment from "../components/singlePostComp/LikeDislikeComment";
import { useState } from "react";
import { xIcon } from "../assets/svg/Xicon";
import AddComment from "../components/singlePostPage/AddComment";

const Post = () => {
  const [isFullScreenImage, setFullScreenImage] = useState(false);
  const { id } = useParams();
  const postId = id ? parseInt(id) : null;
  const post = feedData.find((post) => post.id === postId);

  const openFullScreen = () => {
    setFullScreenImage(true);
    document.body.style.overflow ='hidden'
  };

  const closeFullScreen = () => {
    setFullScreenImage(false);
    document.body.style.overflow ='auto'
  };

  if (!post) {
    return (
      <div>
        <PageLayout>
          <p>Post not found!</p>
        </PageLayout>
      </div>
    );
  }

  return (
    <div>
      <PageLayout>
        <div className="single_post_page">
          <div className="goBack_authorInfo">
            <GoBack />
            <Author avatar={post.avatar} name={post.name} />
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

          <LikeDislikeComment />

          <AddComment />
        </div>
      </PageLayout>
    </div>
  );
};

export default Post;
