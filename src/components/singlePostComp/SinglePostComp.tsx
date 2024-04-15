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

interface SinglePostProps {
  authorName: string;
  authorAvatar: string;
  postTitle: string;
  image?: string;
  postID: number;
  likes: number;
  dislikes: number;
  type: string | number;
}

const SinglePostComp: React.FC<SinglePostProps> = ({
  authorName,
  authorAvatar,
  postTitle,
  image,
  postID,
  likes,
  dislikes,
  type
}) => {

  const { isDark } = useDarkModeHook()
  return (
      <div className="post_borders">
        <div className={isDark ? "single_post_comp dark" : "single_post_comp"}>
          <Author avatar={authorAvatar} name={authorName} />
          <PostTitle title={postTitle} />
          
          {type === "0"
            ? (image ? <PostImage image={image} /> : <></>)
            : type === "1" ?
            (image ? <PostVideo image={image} /> : <></>)
            : <></>

          }
          
          
          
          <LikeDislikeComment likes={likes} dislikes={dislikes} postID={postID} />
        
          <SeeMore postID={postID} />
        </div>
      </div>
  );
};

export default SinglePostComp;
