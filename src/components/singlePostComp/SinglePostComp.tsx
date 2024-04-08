import React from "react";
import "./singlePostComp.css";
import Author from "./Author";
import PostTitle from "./PostTitle";
import PostImage from "./postImage";
import { useDarkModeHook } from "../../hooks/useDarkModeHook";
import LikeDislikeComment from "./LikeDislikeComment";
import "./singlePostComp.css"

interface SinglePostProps {
  authorName: string;
  authorAvatar: string;
  postTitle: string;
  image?: string;
}

const SinglePostComp: React.FC<SinglePostProps> = ({
  authorName,
  authorAvatar,
  postTitle,
  image,
}) => {

  const { isDark } = useDarkModeHook()
  return (
    <div className="post_borders">
      <div className={isDark ? "single_post_comp dark" : "single_post_comp"}>
        <Author avatar={authorAvatar} name={authorName} />
        <PostTitle title={postTitle} />
        {image ? <PostImage image={image} /> : <></>}
        <LikeDislikeComment />
      </div>
    </div>
  );
};

export default SinglePostComp;
