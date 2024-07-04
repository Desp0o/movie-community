import { useParams } from "react-router-dom";
import Author from "../components/singlePostComp/Author";
import PostImage from "../components/singlePostComp/postImage";
import React, { useEffect, useState } from "react";
import axios from "axios";
import EditPannel from "../components/singlePostComp/EditPannel";
import PostVideo from "../components/singlePostComp/postVideo";
import { useQuery } from "react-query";
import { useUserHook } from "../hooks/useUserHook";
import ScrollToTop from "../components/scrollToTop/ScrollToTop";
import Spinner from "../components/spinner/Spinner";
import PageLayout from "../components/pageLayout/PageLayout";

import "./post.css"
import LikeCommentShare from "../components/singlePostComp/LikeCommentShare";
import BookmarkPost from "../components/singlePostComp/BookmarkPost";
import CommentsSection from "../components/singlePostComp/CommentsSection";
import Footer from "../components/footer/Footer";
import Poll from "../components/singlePostComp/Poll";
import { bigcloseSquareIcon } from "../assets/newSvg/closeSquareIcon";


const Post = () => {
  const token = localStorage.getItem('token')
  const { id } = useParams();
  const { user } = useUserHook()
  const [isFullScreen, setFullScreen] = useState(false)
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


  useEffect(()=>{
    if(isFullScreen){
      document.body.style.overflow = "hidden"
    }else{
      document.body.style.overflow = "auto"
    }
  },[isFullScreen])

  if (isError) {
    console.error(error)
  }

  if (isLoading) {
    return <Spinner />
  }

  const makeItFullScreen = () => {
    setFullScreen(!isFullScreen)
  }


  return (
    <>
      <ScrollToTop />
      <PageLayout>
        <div className="post_page">
          <div className="post_page_inner">
            {data?.post?.user_id === user.userID && <EditPannel postID={data?.post?.id} type={data?.post?.type} />}

            <div className="author_title_media">
              <div className="post_page_inner_block1">
                <Author avatar={data?.post?.user?.avatar} name={data?.post?.user?.name} date={data?.post?.created_at} />
                <BookmarkPost mySave={data.post.mySave} postID={data.post.id} />
              </div>

              <p className="post_page_inner_block1_title">{data?.post.text}</p>

              {
                data?.post?.img &&
                <div className="media_cont">
                  {data.post.type === 1 && <span onClick={makeItFullScreen}><PostImage image={data.post.img} type={data.post.type} /></span>}
                  {data.post.type === 0 && <PostVideo image={data.post.img} />}

                  {isFullScreen && <span onClick={makeItFullScreen}><IsFullScreenImage img={data.post.img}/></span>}
                </div>
              }

              {
                data?.post?.type === 3 && <Poll pollAnswers={data?.polls} refetch={refetch} data={data?.post?.myPoll} />
              }

              <LikeCommentShare
                postID={data.post.id}
                commentLength={data.post.comments}
                refetchCallBack={refetch}
                guls={data.post.guls}
                authGul={data.post.myGul}
              />
            </div>

            <CommentsSection commentsData={data.comments} id={data?.post?.id} refetch={refetch} />
          </div>


        </div>
      </PageLayout>
      <Footer />
    </>
  );
};

export default Post;


interface IsFullScreenImageProp{
  img: string;
}
const IsFullScreenImage:React.FC<IsFullScreenImageProp> = ({ img }) => {

  return (
    <div className="post_full_screen_img">
      <span className="post_full_screen_img_close">{bigcloseSquareIcon}</span>
      <img src={`${import.meta.env.VITE_IMAGE_PATH}${img}.webp`} alt='post image' className='post_full_screen_img_img' />
    </div>
  )
}