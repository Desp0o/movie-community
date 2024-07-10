import React, { useEffect, useState } from 'react';
import { GulingFuction } from './likeFunction/GulingFuction';
import { likeIcon, likeIconFilled } from '../../assets/newSvg/likeIcon';
import { useUserHook } from '../../hooks/useUserHook';
import { shareIcon } from '../../assets/newSvg/shareIcon';
import IconBlock from './IconBlock';
import { Link } from 'react-router-dom';
import { commentsIcon, commentsIconFilled } from '../../assets/newSvg/commentsIcon';
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from 'react-query';
import { useLoginModal } from '../../hooks/useLoginModal';
import Author from './Author';
import { closeSquareIcon } from '../../assets/newSvg/closeSquareIcon';

interface LikeCommentShareProps {
  authGul?: number;
  guls?: number;
  postID: number;
  commentLength: number;
  refetchCallBack: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<unknown, unknown>>;
  allLikes?: { user: { name: string; avatar: string } }[];
}

const LikeCommentShare: React.FC<LikeCommentShareProps> = ({
  authGul = 0,
  guls = 0,
  postID,
  commentLength,
  refetchCallBack,
  allLikes = []
}) => {
  const { Guling } = GulingFuction();
  const { user } = useUserHook();
  const { handleVisibility } = useLoginModal();
  const [commentIcon, setCommentIcon] = useState(commentLength !== 0 ? commentsIconFilled : commentsIcon);
  const [heartIcon, setHeartIcon] = useState(authGul === 1 ? likeIconFilled : likeIcon);
  const [isHeartClicked, setHeartClicked] = useState(authGul === 1);
  const [likeCount, setLikeCount] = useState(guls);
  const [allUserLikes, setAllUserLikes] = useState(allLikes);
  const [isActive, setActive] = useState(false);

  useEffect(() => {
    setAllUserLikes(allLikes);
    refetchCallBack()
  }, [allLikes, isActive]);

  const likingPost = (): void => {
    if (user.userID && user.name) {
      Guling(postID);
      setHeartClicked(!isHeartClicked);

      if (isHeartClicked) {
        setHeartIcon(likeIcon);
        setLikeCount((prev) => prev - 1);
      } else {
        setHeartIcon(likeIconFilled);
        setLikeCount((prev) => prev + 1);
      }
    } else {
      handleVisibility();
    }
  };

  useEffect(() => {
    setCommentIcon(commentLength !== 0 ? commentsIconFilled : commentsIcon);
    refetchCallBack();
  }, [commentLength, refetchCallBack]);

  useEffect(() => {
    setHeartIcon(authGul === 1 ? likeIconFilled : likeIcon);
    setHeartClicked(authGul === 1);
  }, [authGul]);

  useEffect(() => {
    setLikeCount(guls);
    refetchCallBack();
  }, [guls, refetchCallBack]);

  const openPopUpOverlay = () => {
    setActive(true);
  };
  
  const closePopUpOverlay = () => {
    setActive(false);
  };

  return (
    <div>
      {isActive ? <SeeAllLikePanel closeOverlay={closePopUpOverlay} likedUsers={allUserLikes} /> : null}
      {allUserLikes.length > 0 && (
        <p className='all_likes_users' onClick={openPopUpOverlay}>{allUserLikes[0].user.name} and {likeCount - 1} others</p>
      )}
      <div className="post_bottom_icons">
        <div className="post_commens_share_icons">
          <span onClick={likingPost}>
            <IconBlock icon={heartIcon} quantity={likeCount} width={48} />
          </span>
          <Link to={`/Post/${postID}`}>
            <IconBlock icon={commentIcon} quantity={commentLength} width={48} />
          </Link>
        </div>
        <div className="like_post_icon">
          <IconBlock icon={shareIcon} displayNone={true} />
        </div>
      </div>
    </div>
  );
};

export default LikeCommentShare;

interface SeeAllLikePanelProps {
  closeOverlay: () => void;
  likedUsers: { user: { avatar: string; name: string } }[];
}

const SeeAllLikePanel: React.FC<SeeAllLikePanelProps> = ({ closeOverlay, likedUsers }) => {
  const [fetchedLikedUsers, setFetchedLikedUser] = useState(likedUsers)
  useEffect(()=>{
    setFetchedLikedUser(likedUsers)
  },[likedUsers])
  return (
    <>
      <div className='overlay' onClick={closeOverlay}></div>
      <div className='SeeAllLikePanel'>
        <span className='likes_panel_close_icon' onClick={closeOverlay}>{closeSquareIcon}</span>
        <div className='likes_panel_users_parent'>
        {
          fetchedLikedUsers.map((item, index) => (
            <Link to='' key={index}>
              <Author key={index} avatar={item.user.avatar} name={item.user.name} />
            </Link>
          ))
        }
        </div>
      </div>
    </>
  )
}
