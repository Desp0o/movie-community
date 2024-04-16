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

interface LikeDislikeCommentProps {
  likes: number;
  dislikes: number;
  postID: number;
  authLike: string;
}

const LikeDislikeComment:React.FC<LikeDislikeCommentProps> = ({likes, dislikes, postID, authLike}) => {
  const token = localStorage.getItem('token')
  const [votes, seteVotes] = useState(likes - dislikes)
  const [isLikeActive, setLikeActive] = useState(authLike === 'like' ? true : false)
  const [isDislikeActive, setDislikeActive] = useState( authLike === 'dislike' ? true : false)
  const [likeIcon, setLikeIcon] = useState(authLike === 'like' ? activeLike : arrowLike)
  const [dislikeIcon, setDislikeIcon] = useState(authLike === 'dislike' ? activeDislike : arrowDislike)
  const { user } = useUserHook()
  const dispatch = useDispatch()

  const [isUserLogged, setUserLogged] = useState(false)
  useEffect(()=>{
    if(user.name && user.userID){
      setUserLogged(true)
    }else{
      setUserLogged(false)
    }
  },[isUserLogged, user, token])

  const [isLike, _setLike] = useState({
    post: postID,
    like: 'like'
  })
  const [isUnlike, _setUnLike] = useState({
    post: postID,
    like: 'dislike'
  })

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
    if(isUserLogged){
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
      if(isUserLogged){
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
            <p style={{ color: votes > 0 ? "green" : votes === 0 ? 'currentColor' : "red" }}>{votes}</p>
            <span onClick={sendUnlike}>{dislikeIcon}</span>
        </div>

        <div className="single_post_comments">
            {commentsIcon}
            <p>0</p>
        </div>
    </div>
  )
}

export default LikeDislikeComment