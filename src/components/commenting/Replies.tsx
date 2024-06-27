import React, { useEffect, useRef, useState } from 'react';
import { dotsForComments } from '../../assets/newSvg/dotsForComments';
import { useUserHook } from '../../hooks/useUserHook';
import SettingForComment from './SettingForComment';
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from 'react-query';

interface RepliesProps {
  replayedComments: {
    id: number;
    text: string;
    user_id: number
  }[];
  refetchCallBack: <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) => Promise<QueryObserverResult<any, unknown>>
}


const Replies: React.FC<RepliesProps> = ({ replayedComments, refetchCallBack }) => {
  const { user } = useUserHook();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
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

  return (
    <>
      {replayedComments.map((item, index) => (
        <div className="replayed_comment_parent" key={index}>

          {/* რეფლაი კომენტარის ტექსტი და replay ღილაკი */}
          <div>
            <div className="replayed_comment">
              <p className="replayed_comment_text">{item.text}</p>
            </div>
            
            <p className='single_comment_replay'>
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
      ))}
    </>
  );
};

export default Replies;
