import React, { useEffect, useState } from "react";
import "./singlePostComp.css";
import Author from "./Author";
import PostTitle from "./PostTitle";
import PostImage from "./postImage";
import { useDarkModeHook } from "../../hooks/useDarkModeHook";
import LikeDislikeComment from "./LikeDislikeComment";
import "./singlePostComp.css"
import SeeMore from "./SeeMore";
import PostVideo from "./postVideo";
import axios from "axios";
import { useUserHook } from "../../hooks/useUserHook";
import { useDispatch } from "react-redux";
import { setRefetch } from "../../Redux/RefetchSlicer";
import { useRefetchHook } from "../../hooks/useRefetchHook";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { setEditPostModal } from "../../Redux/EditPostSlicer";


interface SinglePostProps {
  authorName: string;
  authorAvatar: string;
  postTitle: string;
  image?: string;
  postID: number;
  likes: number;
  dislikes: number;
  type: string | number;
  authLike: string;
  date: string;
  postUserId:number;
  postStatus:string | number;
}

const SinglePostComp: React.FC<SinglePostProps> = ({
  authorName,
  authorAvatar,
  postTitle,
  image,
  postID,
  likes,
  dislikes,
  type,
  authLike,
  date,
  postUserId,
  postStatus
}) => {
  const [isUserLogged, setUserLoged] = useState(false)
  const {user} = useUserHook()
  const {requestRefetch} = useRefetchHook()
  const token  = localStorage.getItem('token')
  const dispatch = useDispatch()

  const notify = () => toast.success('Post deleted Successfully !',{ autoClose: 1000, theme: "colored" });
  const notifyError = () => toast.error('Error',{ autoClose: 1000, theme: "colored" });

  const deletePost = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_POST_DELETE}${postID}`,
        {
          headers:{
            Authorization: `Bearer ${token}`
          }
        }
      )
      console.log(response);
      notify()
      dispatch(setRefetch(!requestRefetch))
    } catch (error) {
      console.log(error);
      notifyError()
    }
  }

  const editPost = () => {
    dispatch(setEditPostModal({value: true, id: postID}))
  }

  useEffect(()=>{
    if(Number(user.userID) === postUserId){
      setUserLoged(true)
    }else{
      setUserLoged(false)
    }
  },[user, isUserLogged])

  const { isDark } = useDarkModeHook()
  return (
    <>
    <div className="post_borders">
        
        {isUserLogged 
        ? 
        <>
          <p onClick={editPost}>edit</p>
        <p className="delete_btn" onClick={deletePost}>delete</p> 
        </>
        : 
        <></>}

        
        <div className={isDark ? "single_post_comp dark" : "single_post_comp"}>
          <Author avatar={authorAvatar} name={authorName} date={date} />
          <PostTitle title={postTitle} postStatus={postStatus} />
          
          {type === "0"
            ? (image ? <PostImage image={image} /> : <></>)
            : type === "1" ?
            (image ? <PostVideo image={image} /> : <></>)
            : <></>

          }
          
          
          
          <LikeDislikeComment likes={likes} dislikes={dislikes} postID={postID} authLike={authLike} />
        
          <SeeMore postID={postID} />
        </div>
      </div>
    </>
    
  );
};

export default SinglePostComp;
