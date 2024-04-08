import React from "react";
import Author from "../singlePostComp/Author";
import PostImage from "../singlePostComp/postImage";
import LikeDislikeComment from "../singlePostComp/LikeDislikeComment";
import { useDarkModeHook } from "../../hooks/useDarkModeHook";
import PostTitle from "../singlePostComp/PostTitle";
import "./singleQuizComp.css"
import QuizAnswers from "./QuizAnswers";

interface SingleQuizComponentProps {
    authorAvatar: string;
    authorName: string;
    postTitle: string;
    image?: string;
}

const SingleQuizComponent:React.FC<SingleQuizComponentProps> = ({authorAvatar, authorName, postTitle, image}) => {
  const { isDark } = useDarkModeHook();

  return (
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
  );
};

export default SingleQuizComponent;
