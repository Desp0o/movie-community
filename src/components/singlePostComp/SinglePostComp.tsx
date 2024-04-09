import React from "react";
import "./singlePostComp.css";
import Author from "./Author";
import PostTitle from "./PostTitle";
import PostImage from "./postImage";
import { useDarkModeHook } from "../../hooks/useDarkModeHook";
import LikeDislikeComment from "./LikeDislikeComment";
import "./singlePostComp.css"
import SeeMore from "./SeeMore";

interface SinglePostProps {
  authorName: string;
  authorAvatar: string;
  postTitle: string;
  image?: string;
  postID: number;
}

const SinglePostComp: React.FC<SinglePostProps> = ({
  authorName,
  authorAvatar,
  postTitle,
  image,
  postID
}) => {

  const { isDark } = useDarkModeHook()
  return (
      <div className="post_borders">
        <div className={isDark ? "single_post_comp dark" : "single_post_comp"}>
          <Author avatar={authorAvatar} name={authorName} />
          <PostTitle title={postTitle} />
          {image ? <PostImage image={image} /> : <></>}
          <LikeDislikeComment />
        
          <SeeMore postID={postID} />
        </div>
      </div>
  );
};

export default SinglePostComp;
