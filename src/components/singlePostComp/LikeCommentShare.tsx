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

  const [isActive, setActive] = useState(false);
  const [likeComShareStats, setLikeComShareStats] = useState({
    commentIcon: commentLength !== 0 ? commentsIconFilled : commentsIcon,
    isHeartClicked: authGul === 1,
    heartIcon: authGul === 1 ? likeIconFilled : likeIcon,
    allUserLikes: allLikes,
    likeCount: guls
  });

  useEffect(() => {
    setLikeComShareStats(prevValue => ({
      ...prevValue,
      allUserLikes: allLikes,
      commentIcon: commentLength !== 0 ? commentsIconFilled : commentsIcon,
      heartIcon: authGul === 1 ? likeIconFilled : likeIcon,
      isHeartClicked: authGul === 1,
      likeCount: guls
    }));
    if (allLikes.length > 0) {
      refetchCallBack();
    }
  }, [allLikes, commentLength, authGul, guls, refetchCallBack]);

  const likingPost = (): void => {
    if (user.isAuthenticated) {
      Guling(postID);

      setLikeComShareStats(prevValue => {
        const newLikeStatus = !prevValue.isHeartClicked;
        const updatedLikes = newLikeStatus ? [...prevValue.allUserLikes, { user }] : prevValue.allUserLikes.filter(like => like.user.name !== user.name);

        return {
          ...prevValue,
          isHeartClicked: newLikeStatus,
          heartIcon: newLikeStatus ? likeIconFilled : likeIcon,
          likeCount: newLikeStatus ? prevValue.likeCount + 1 : prevValue.likeCount - 1,
          allUserLikes: updatedLikes
        };
      });
    } else {
      handleVisibility();
    }
  };

  const openPopUpOverlay = () => setActive(true);
  const closePopUpOverlay = () => setActive(false);

  return (
    <div>
      {isActive && <SeeAllLikePanel closeOverlay={closePopUpOverlay} likedUsers={likeComShareStats.allUserLikes} />}
      {likeComShareStats.allUserLikes.length > 0 && (
        <p className='all_likes_users' onClick={openPopUpOverlay}>
          {/* თუ მე დავალაიქე ჩემი სახელი უნდა გამოჩნდეს, თუ არა სხვა პირველის */}
          {likeComShareStats.isHeartClicked ? "You" : likeComShareStats.allUserLikes[0].user.name} 
          {likeComShareStats.allUserLikes.length > 1 ? ` and ${likeComShareStats.likeCount - 1} others ` : null} liked
        </p>
      )}
      <div className="post_bottom_icons">
        <div className="post_commens_share_icons">
          <span onClick={likingPost}>
            <IconBlock icon={likeComShareStats.heartIcon} quantity={likeComShareStats.likeCount} width={48} />
          </span>
          <Link to={`/Post/${postID}`}>
            <IconBlock icon={likeComShareStats.commentIcon} quantity={commentLength} width={48} />
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

  useEffect(() => {
    setFetchedLikedUser(likedUsers)
  }, [likedUsers])

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
