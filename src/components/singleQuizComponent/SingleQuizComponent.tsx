import React from "react";
import Author from "../singlePostComp/Author";
import PostImage from "../singlePostComp/postImage";
// import LikeDislikeComment from "../singlePostComp/LikeDislikeComment";
import { useDarkModeHook } from "../../hooks/useDarkModeHook";
import PostTitle from "../singlePostComp/PostTitle";
import "./singleQuizComp.css"
import QuizAnswers from "./QuizAnswers";
import SeeMore from "../singlePostComp/SeeMore";

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
      <div className="post_borders">
        <div className={isDark ? "single_post_comp dark" : "single_post_comp"}>
        <Author avatar={authorAvatar} name={authorName} date={""} />
        <PostTitle title={postTitle} postStatus={""} />
        {image ? <PostImage image={image} /> : <></>}
        {/* <LikeDislikeComment likes={0} dislikes={0} postID={0} authLike={""} commentLength={0} authGul={0} guls={0} /> */}
        
        <div className="answers_container">
            <QuizAnswers />
        </div>
        <SeeMore postID={postID}/>
        </div>
      </div>
  );
};

export default SingleQuizComponent;
