import React from "react";
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
import { Link } from "react-router-dom";

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
  postUserId
}) => {

  const {user} = useUserHook()
  const token  = localStorage.getItem('token')
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
      
    } catch (error) {
      console.log(error);
      
    }
  }

  const { isDark } = useDarkModeHook()
  return (
      <div className="post_borders">
        <Link to={`/pages/EditPost/${postID}`}>
          <p>edit</p>
        </Link>
        {postUserId === Number(user.userID) ? <p className="delete_btn" onClick={deletePost}>delete</p> : <></>}
        <div className={isDark ? "single_post_comp dark" : "single_post_comp"}>
          <Author avatar={authorAvatar} name={authorName} date={date} />
          <PostTitle title={postTitle} />
          
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
  );
};

export default SinglePostComp;
