import React from "react";
import Author from "../singlePostComp/Author";
import PostImage from "../singlePostComp/postImage";
import LikeDislikeComment from "../singlePostComp/LikeDislikeComment";
import { useDarkModeHook } from "../../hooks/useDarkModeHook";
import PostTitle from "../singlePostComp/PostTitle";
import "./singleQuizComp.css"
import QuizAnswers from "./QuizAnswers";
import { Link } from "react-router-dom";

interface SingleQuizComponentProps {
    authorAvatar: string;
    authorName: string;
    postTitle: string;
    image?: string;
    postID: number;
}

const SingleQuizComponent:React.FC<SingleQuizComponentProps> = ({authorAvatar, authorName, postTitle, image, postID}) => {
  const { isDark } = useDarkModeHook();

  return (
    <Link to={`/pages/Post/${postID}`}>
      <div className="post_borders">
        <div className={isDark ? "single_post_comp dark" : "single_post_comp"}>
        <Author avatar={authorAvatar} name={authorName} />
        <PostTitle title={postTitle} />
        {image ? <PostImage image={image} /> : <></>}
        <LikeDislikeComment />
        
        <div className="answers_container">
            <QuizAnswers />
        </div>
        </div>
      </div>    
    </Link>
  );
};

export default SingleQuizComponent;
