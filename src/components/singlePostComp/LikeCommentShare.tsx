import React, { useEffect, useState } from 'react'
import { GulingFuction } from './likeFunction/GulingFuction';
import { likeIcon, likeIconFilled } from '../../assets/newSvg/likeIcon';
import { useUserHook } from '../../hooks/useUserHook';
import { shareIcon } from '../../assets/newSvg/shareIcon';
import IconBlock from './IconBlock';
import { Link } from 'react-router-dom';
import { commentsIcon, commentsIconFilled } from '../../assets/newSvg/commentsIcon';
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from 'react-query';

interface LikeCommentShareProps{
  type: number | string;
  authGul?: number;
  guls?: number;
  postID: number;
  commentLength: number;
  refetchCallBack: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<unknown, unknown>>;
}

const LikeCommentShare:React.FC<LikeCommentShareProps> = ({type, authGul, guls, postID, commentLength, refetchCallBack}) => {
  const { Guling } = GulingFuction();
  const {user} = useUserHook()

  const [commentIcon, setCommentIcon] = useState(commentLength !== 0 ? commentsIconFilled : commentsIcon) //comments icon
  const [heartIcon, setHeartIcon] = useState(authGul === 1 ? likeIconFilled : likeIcon) //like icon
  const [isHeartClicked, setHeartClicked] = useState(authGul === 1 ? true : false) //like icon active/inactvie indicator
  const [likeCount, setLikeCount] = useState(guls ? guls : 0)

  const likingPost = () => {
    if(user.userID && user.name){
      Guling(postID)
      setHeartClicked(!isHeartClicked)

      if(isHeartClicked){
        setHeartIcon(likeIcon)
        setLikeCount((prev) => prev - 1)
      }else{
        setHeartIcon(likeIconFilled)
        setLikeCount((prev) => prev + 1)
      }
    }

    refetchCallBack()
  }

  useEffect(()=>{
    if (commentLength !== 0) {
      setCommentIcon(commentsIconFilled)
    }

    if (commentLength === 0) {
      setCommentIcon(commentsIcon)
    }

    refetchCallBack()
  },[commentLength])

  useEffect(()=>{
    if (authGul === 0) {
      setHeartIcon(likeIcon)
      setHeartClicked(false)
    }

    if (authGul === 1) {
      setHeartIcon(likeIconFilled)
      setHeartClicked(true)
    }
  },[authGul])

  useEffect(()=>{
    guls &&
    setLikeCount(guls)
  },[guls])


  return (
    
      type !== 4 
      &&
    <div className="post_bottom_icons">
        <div className="post_commens_share_icons">
        <span onClick={likingPost}><IconBlock icon={heartIcon} quantity={likeCount} width={48}/></span>  
          <Link to={`/pages/Post/${postID}`}><IconBlock icon={commentIcon} quantity={commentLength} width={48} /></Link>
        </div> 

        <div className="like_post_icon">
        <IconBlock icon={shareIcon} />
        </div> 
    </div>
    
    
  )
}

export default LikeCommentShare