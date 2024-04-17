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
import AddComment from "../components/commenting/AddComment";
import CommentsSection from "../components/commenting/CommentsSection";
import axios from "axios";
import Fetching from "../components/fetchingComponent/Fetching";
import EditPannel from "../components/singlePostComp/EditPannel";
import PostVideo from "../components/singlePostComp/postVideo";

interface PostData {
  title: string;
  created_at: string;
  img: string;
  type: number | string;
  like: number;
  dislike: number;
  id: number;
  status: number | string;
  comment:number;
  authLike: string
  user: {
    avatar: string;
    name: string;
  };
}

const Post = () => {
  const imageStoragePath = import.meta.env.VITE_IMAGE_PATH;
  const [isFullScreenImage, setFullScreenImage] = useState(false);
  const { id } = useParams();
  const [data, setData] = useState<PostData | null>(null);
  const [commData, setComData] = useState([])
  const [isLoading, setLoading] = useState(false);

  const openFullScreen = () => {
    setFullScreenImage(true);
    document.body.style.overflow = "hidden";
  };

  const closeFullScreen = () => {
    setFullScreenImage(false);
    document.body.style.overflow = "auto";
  };

  useEffect(() => {
    const requestSInglePost = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SINGLE_POST}${id}`
        );
        console.log(response.data);
        setComData(response.data.comments)
        setData(response.data.post);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    requestSInglePost();
  }, []);

  if (isLoading) {
    return <Fetching />;
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

            <AddComment postID={id}/>

            {Number(data.comment) > 0 ? <CommentsSection fetchedComments={commData}/> : <></>}
            
          </div>
        </PageLayout>
      ) : (
        <p>post not found</p>
      )}
    </div>
  );
};

export default Post;
