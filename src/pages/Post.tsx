import { useParams } from "react-router-dom";
import PageLayout from "../components/pageLayout/PageLayout";
import GoBack from "../components/singlePostPage/GoBack";
import Author from "../components/singlePostComp/Author";
import PostTitle from "../components/singlePostComp/PostTitle";
import PostImage from "../components/singlePostComp/postImage";
import QuizAnswers from "../components/singleQuizComponent/QuizAnswers";
import "../components/singlePostPage/singlePostPage.css";
import LikeDislikeComment from "../components/singlePostComp/LikeDislikeComment";
import { useState } from "react";
import { xIcon } from "../assets/svg/Xicon";
import AddComment from "../components/commenting/AddComment";
import CommentsSection from "../components/commenting/CommentsSection";
import axios from "axios";
import Fetching from "../components/fetchingComponent/Fetching";
import EditPannel from "../components/singlePostComp/EditPannel";
import PostVideo from "../components/singlePostComp/postVideo";
import { useQuery } from "react-query";

const Post = () => {
  const imageStoragePath = import.meta.env.VITE_IMAGE_PATH;
  const [isFullScreenImage, setFullScreenImage] = useState(false);
  const { id } = useParams();
  const [commData, setComData] = useState([])

  const openFullScreen = () => {
    setFullScreenImage(true);
    document.body.style.overflow = "hidden";
  };

  const closeFullScreen = () => {
    setFullScreenImage(false);
    document.body.style.overflow = "auto";
  };

  const { data, isLoading, isError, error, refetch } = useQuery(
    `single-post`,
    async () => {
      const response = await axios.get(`${import.meta.env.VITE_SINGLE_POST}${id}`);
      setComData(response.data.comments);
      return response.data.post; 
    }
  );

  if (isLoading) {
    return <Fetching />;
  }

  if(isError){
    console.error(error)
  }

  return (
    <div>
      {data ? (
        <PageLayout>
          <div className="single_post_page">
            <div className="goBack_authorInfo_container">
              <div className="goBack_authorInfo">
                <GoBack />
                <Author
                  avatar={data?.user?.avatar}
                  name={data?.user?.name}
                  date={data?.created_at}
                />
              </div>
              <EditPannel postID={data?.id} isInnerPage={true}/>
            </div>

            <div className="single_page_title">
              <PostTitle title={data?.title} postStatus={data?.status} />
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
                  <img
                    src={`${imageStoragePath}${data?.img}.webp`}
                    className="full_screen_cover"
                    alt="full screen cover"
                  />
                  <img
                    src={`${imageStoragePath}${data?.img}.webp`}
                    className="full_screen_photo"
                    alt="full screen photo"
                  />
                </div>
              ) : (
                <></>
              )}
              {data?.img && data?.type === "0" && (
                <PostImage image={data?.img} funName={openFullScreen} />
              ) }

              {data?.img && data?.type === "1" && (
                <PostVideo image={data?.img} />
              ) }


            </div>

            {data?.type === 1 && (
              <div className="answers_container">
                <QuizAnswers />
              </div>
            )}

            <LikeDislikeComment
              likes={data.like}
              dislikes={data.dislike}
              postID={data.id}
              authLike={data.authLike} 
              commentLength={data.comment}            
              />

            <AddComment postID={id} callBack={refetch}/>

            {Number(data.comment) > 0 ? <CommentsSection fetchedComments={commData} callback={refetch}/> : <></>}
            
          </div>
        </PageLayout>
      ) : (
        <p>post not found</p>
      )}
    </div>
  );
};

export default Post;
