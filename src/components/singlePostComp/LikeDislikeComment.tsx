import React, { useEffect, useState } from "react";
import { arrowDislike } from "../../assets/svg/arrowDislike"
import { arrowLike } from "../../assets/svg/arrowLike"
import { commentsIcon } from "../../assets/svg/commentsIcon"
import "./singlePostComp.css"
import axios from "axios";
import { activeLike } from "../../assets/svg/activeLike";
import { activeDislike } from "../../assets/svg/activeDislike";
import { useUserHook } from "../../hooks/useUserHook";
import { useDispatch } from "react-redux";
import { setModalVisible } from "../../Redux/loginModalSlicer";
import { setRefetch } from "../../Redux/RefetchSlicer";
import { useRefetchHook } from "../../hooks/useRefetchHook";

interface LikeDislikeCommentProps {
  likes: number;
  dislikes: number;
  postID: number;
  authLike: string;
  commentLength: number
}

const LikeDislikeComment:React.FC<LikeDislikeCommentProps> = ({likes, dislikes, postID, authLike, commentLength}) => {
  const { user } = useUserHook()
  const { requestRefetch } = useRefetchHook()
  const token = localStorage.getItem('token')
  const [votes, seteVotes] = useState(likes - dislikes)
  const [isLikeActive, setLikeActive] = useState(false)
  const [isDislikeActive, setDislikeActive] = useState(false)
  const [likeIcon, setLikeIcon] = useState(arrowLike)
  const [dislikeIcon, setDislikeIcon] = useState(arrowDislike)
  const dispatch = useDispatch()

  const [isLike,] = useState({
    post: postID,
    like: 'like'
  })
  const [isUnlike,] = useState({
    post: postID,
    like: 'dislike'
  })

  useEffect(()=>{
    if(user.name !== "" && authLike === 'like'){
      setLikeActive(true)
      setLikeIcon(activeLike)

      setDislikeActive(false)
      setDislikeIcon(arrowDislike)
    }
    
    if(user.name !== "" && authLike === 'dislike'){
      setDislikeActive(true)
      setDislikeIcon(activeDislike)

      setLikeActive(false)
      setLikeIcon(arrowLike)
    }

    if(user.name !== "" && authLike === null){
      setDislikeActive(false)
      setDislikeIcon(arrowDislike)

      setLikeActive(false)
      setLikeIcon(arrowLike)
    }

    if(user.name === "" && authLike === undefined){
      setDislikeActive(false)
      setDislikeIcon(arrowDislike)

      setLikeActive(false)
      setLikeIcon(arrowLike)
    }
    dispatch(setRefetch(!requestRefetch))
    
    // eslint-disable-next-line
  },[user.name, authLike, user.userID, dispatch])

  const unlikeFunction = async () => {
    try {
      const response = await axios.post(import.meta.env.VITE_UNLIKING, isLike, {
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      console.log(response.data);
      
    } catch (error) {
      console.log(error);
      
    }
  }

  const likeFunction = async () => {    
    try {
      const response = await axios.post(import.meta.env.VITE_LIKING, isLike, {
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      console.log(response.data);
      
    } catch (error) {
      console.log(error);
      
    }
  }

  const sendLike = async () => {
    if(user.userID){
      if(!isLikeActive){
        setLikeActive(true) // set like button active 
        seteVotes(votes + 1) // add vote 
        setLikeIcon(activeLike) // make like button green
        setDislikeIcon(arrowDislike) //set dislike button inherit
        setDislikeActive(false) // make dislike button active
        likeFunction() //send like function
  
        if(isDislikeActive){
          unDislikeFunction()
          seteVotes(votes + 2)
         }
      }else{
        setLikeActive(false) //set like button inactive 
        seteVotes(votes - 1) 
        setLikeIcon(arrowLike)
        unlikeFunction()
      }
    }else{
      dispatch(setModalVisible(true))
    }
  }

  const dislikeFunction = async () => {
    console.log('i disliked post');
    
    try {
      const response = await axios.post(import.meta.env.VITE_LIKING, isUnlike, {
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      console.log(response.data);
      
    } catch (error) {
      console.log(error);
      
    }
  }

  const unDislikeFunction = async () => {
    try {
      const response = await axios.post(import.meta.env.VITE_UNLIKING, isUnlike, {
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      console.log(response.data);
      
    } catch (error) {
      console.log(error);
      
    }
  }

  const sendUnlike = async () => {
      if(user.userID){
        if(!isDislikeActive){
          setDislikeActive(true)
          seteVotes(votes - 1)
          setDislikeIcon(activeDislike)
          setLikeIcon(arrowLike)
          setLikeActive(false)
     
          if(isLikeActive){
           unlikeFunction()
           seteVotes(votes - 2)
          }
          dislikeFunction()
         }else{
           setDislikeActive(false)
           seteVotes(votes + 1)
           setDislikeIcon(arrowDislike)
           unDislikeFunction()
         }
      }else{
        dispatch(setModalVisible(true))
      }
  }


  return (
    <div className="likeDislikeComment_container">
        <div className="like_dislike">
            <span onClick={sendLike}>{likeIcon}</span>
            <p style={{width: votes > 99 ? "35px" : "20px",textAlign:"center", color: votes > 0 ? "green" : votes === 0 ? 'currentColor' : "red", userSelect:"none" }}>{votes}</p>
            <span onClick={sendUnlike}>{dislikeIcon}</span>
        </div>

        <div className="single_post_comments">
            {commentsIcon}
            <p>{commentLength}</p>
        </div>
    </div>
  )
}

export default LikeDislikeComment