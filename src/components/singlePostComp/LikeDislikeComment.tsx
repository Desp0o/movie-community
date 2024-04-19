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
import { useRefetchHook } from "../../hooks/useRefetchHook";

interface LikeDislikeCommentProps {
  likes: number;
  dislikes: number;
  postID: number;
  authLike: string;
  commentLength: number
}

const LikeDislikeComment:React.FC<LikeDislikeCommentProps> = ({likes, dislikes, postID, authLike, commentLength}) => {
  const token = localStorage.getItem('token')
  const dispatch = useDispatch()
  const { user } = useUserHook()
  const { requestRefetch } = useRefetchHook()
  const [votes, seteVotes] = useState(likes - dislikes)

  const [likeEmoj, setLikeEmoj] = useState({
    active: authLike === 'like' ? true : false,
    icon: authLike === 'like' ? activeLike : arrowLike
  })

  const [disLikeEmoj, setDislikeEmoj] = useState({
    active: authLike === 'dislike' ? true : false,
    icon: authLike === 'dislike' ? activeDislike : arrowDislike 
  })

  useEffect(()=>{
    seteVotes(likes - dislikes)
  },[likes, dislikes])

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
      setLikeEmoj({active: true, icon: activeLike})
      setDislikeEmoj({active: false, icon: arrowDislike})
    }
    
    if(user.name !== "" && authLike === 'dislike'){
      setDislikeEmoj({active: true, icon: activeDislike})
      setLikeEmoj({active: false, icon: arrowLike})
    }

    if(user.name !== "" && authLike === null){
      setDislikeEmoj({active: false, icon: arrowDislike})
      setLikeEmoj({active: false, icon: arrowLike})
    }

    if(user.name === "" && authLike === undefined){
      setDislikeEmoj({active: false, icon: arrowDislike})
      setLikeEmoj({active: false, icon: arrowLike})
    }

    if(!user.name && !user.userID){
      setDislikeEmoj({active: false, icon: arrowDislike})
      setLikeEmoj({active: false, icon: arrowLike})      
    }
    // eslint-disable-next-line
  },[user.name, authLike, user.userID, requestRefetch])

  const unlikeFunction = async () => {
    try {
      const response = await axios.post(import.meta.env.VITE_UNLIKING, isLike, {
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      console.log(response.data);
      
    } catch (error) {
      console.error(error);
      
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
      console.error(error);
      
    }
  }

  const sendLike = async () => {
    if(user.userID){
      if(!likeEmoj.active){
        setLikeEmoj({active: true, icon:activeLike})
        setDislikeEmoj({active: false, icon: arrowDislike})
        
        seteVotes(votes + 1) // add vote 
        likeFunction() //send like function
  
        if(disLikeEmoj.active){
          unDislikeFunction()
          seteVotes(votes + 2)
         }
      }else{
        setLikeEmoj({active: false, icon:arrowLike})

        seteVotes(votes - 1) 
        unlikeFunction()
      }
    }else{
      dispatch(setModalVisible(true))
    }
  }

  const dislikeFunction = async () => {
    
    try {
      const response = await axios.post(import.meta.env.VITE_LIKING, isUnlike, {
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      console.log(response.data);
      
    } catch (error) {
      console.error(error);
      
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
      console.error(error);
      
    }
  }

  const sendUnlike = async () => {
      if(user.userID){
        if(!disLikeEmoj.active){
          setLikeEmoj({active: false, icon:arrowLike})
          setDislikeEmoj({active: true, icon: activeDislike})
          
          seteVotes(votes - 1)
          
          if(likeEmoj.active){
           unlikeFunction()
           seteVotes(votes - 2)
          }
          dislikeFunction()
         }else{
           setDislikeEmoj({active: true, icon: activeDislike})

           seteVotes(votes + 1)
           unDislikeFunction()
         }
      }else{
        dispatch(setModalVisible(true))
      }
  }


  return (
    <div className="likeDislikeComment_container">
        <div className="like_dislike">
            <span onClick={sendLike}>{likeEmoj.icon}</span>
            <p style={{width: votes > 99 ? "35px" : "20px",textAlign:"center", color: votes > 0 ? "green" : votes === 0 ? 'currentColor' : "red", userSelect:"none" }}>{votes}</p>
            <span onClick={sendUnlike}>{disLikeEmoj.icon}</span>
        </div>

        <div className="single_post_comments">
            {commentsIcon}
            <p>{commentLength}</p>
        </div>
    </div>
  )
}

export default LikeDislikeComment