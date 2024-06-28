import React, { useEffect, useRef, useState } from 'react';
import { dotsForComments } from '../../assets/newSvg/dotsForComments';
import { useUserHook } from '../../hooks/useUserHook';
import SettingForComment from './SettingForComment';
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from 'react-query';
import ReplayComment from './ReplayComment';

interface RepliesProps {
  replayedComments: {
    id: number;
    text: string;
    user_id: number;
    feed_id: number;
  }[];
  mainCommentID: number;
  refetchCallBack: <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) => Promise<QueryObserverResult<any, unknown>>
}


const Replies: React.FC<RepliesProps> = ({ mainCommentID, replayedComments, refetchCallBack }) => {
  const { user } = useUserHook();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [replIndex, setReplIndex] = useState<number | null>(null);
  const commentPanelRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        activeIndex !== null &&
        commentPanelRefs.current[activeIndex] &&
        event.target instanceof Node &&
        !commentPanelRefs.current[activeIndex]!.contains(event.target)
      ) {
        setActiveIndex(null);
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [activeIndex]);

  const showSettings = (index: number) => {
    if (index === activeIndex) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  const showReplay = (index: number) => {
    setReplIndex((prevIndex) => (prevIndex === index ? null : index));
    console.log(mainCommentID);
    
  }

  return (
    <>
      {replayedComments.map((item, index) => (
        <div key={index}>
          <div className="replayed_comment_parent" >

            {/* რეფლაი კომენტარის ტექსტი და replay ღილაკი */}
            <div>
              <div className="replayed_comment">
                <p className="replayed_comment_text">{item.text}</p>
              </div>

              <p className='single_comment_replay' onClick={() => showReplay(index)}>
                Replay
              </p>
            </div>

            {/* adding ref with index to each elment */}
            <div ref={(el) => (commentPanelRefs.current[index] = el)} className="comment_panel_and_dots">
              <div>{index === activeIndex && <SettingForComment commentID={item.id} refetchCallbac={refetchCallBack} />}</div>
              <div onClick={() => showSettings(index)} className={index === activeIndex ? 'dot_90_pos' : 'dot_normal_pos'}>
                {item.user_id === user.userID && dotsForComments}
              </div>
            </div>
          </div>
          <div className={replIndex === index ? 'replay_container visible' : 'replay_container '}>
            <div className='replay_for_replie'>
              {
                <ReplayComment id={item.id} feedID={item.feed_id} refetchCallback={refetchCallBack} mentionedUser={item.text} />
              }
            </div>

          </div>
        </div>
      ))}
    </>
  );
};

export default Replies;
