import React, { useEffect, useRef, useState } from 'react';
import { dotsForComments } from '../../assets/newSvg/dotsForComments';
import { useUserHook } from '../../hooks/useUserHook';
import SettingForComment from './SettingForComment';
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from 'react-query';
import ReplayComment from './ReplayComment';
import { JSX } from 'react/jsx-runtime';

interface RepliesProps {
  replayedComments: {
    id: number;
    text: string;
    user_id: number;
    feed_id: number;
    user:{
      name:string;
    }
  }[];
  mainCommentID: number;
  refetchCallBack: <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) => Promise<QueryObserverResult<any, unknown>>;
}

interface CommentProp {
  text: string;
 
}

const Replies: React.FC<RepliesProps> = ({ mainCommentID, replayedComments, refetchCallBack }) => {
  const { user } = useUserHook();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [replIndex, setReplIndex] = useState<number | null>(null);
  const commentPanelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [makeActive, setMakeActive] = useState(false)
  const [reversedComments, setReversedComments] = useState<RepliesProps['replayedComments']>([]);

  useEffect(() => {
    // Create a copy of the array and reverse it
    setReversedComments(replayedComments.reverse());
  }, [replayedComments]);

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
    setMakeActive(true)
  };

  const highlightMentions = (text: string) => {
    // Regular expression to match @username (handles multiple words in a username)
    const mentionRegex = /@[\w]+(?:\s[\w]+)*/g;
  
    // Split the text by the mentions
    const parts = text.split(mentionRegex);
  
    // Find all matches in the text
    const matches = text.match(mentionRegex);
  
    // Combine parts and matches
    const combined: (string | JSX.Element)[] = [];
    parts.forEach((part, index) => {
      combined.push(part);
      if (matches && matches[index]) {
        combined.push(
          <span key={index} style={{ color: '#309782', fontWeight:"500", wordWrap:"break-word"}}>
            {matches[index]}
          </span>
        );
      }
    });
  
    return combined;
  };
  // return text with mentioned user if there are any
  const Comment:React.FC<CommentProp> = ({ text }) => {
    return <p className="replayed_comment_text">{highlightMentions(text)}</p>;
  };

  const editReplay = () => {

  }

  return (
    <>
      {reversedComments.reverse().map((item, index) => (
        <div key={index}>
          <div className="replayed_comment_parent">
            {/* რეფლაი კომენტარის ტექსტი და replay ღილაკი */}
            <div>
            <p className='replayed_comment_user_name'>{item.user.name}</p>
              <div className="replayed_comment">
               <Comment text={item.text} />
                {/* adding ref with index to each element */}
                <div ref={(el) => (commentPanelRefs.current[index] = el)} className="comment_panel_and_dots">
                  <div>
                    {index === activeIndex && <SettingForComment commentID={item.id} refetchCallbac={refetchCallBack} editCom={editReplay}/>}
                  </div>
                  <div onClick={() => showSettings(index)} className='dot_normal_pos'>
                    {item.user_id === user.userID && dotsForComments}
                  </div>
                </div>
              </div>
              <p className='single_comment_replay' onClick={() => showReplay(index)}>
                Replay
              </p>
            </div>
          </div>
          <div className={(replIndex === index && makeActive) ? 'replay_container visible' : 'replay_container'}>
            <div className='replay_for_replie'>
              {
                <ReplayComment setter={()=>setMakeActive(false)}id={mainCommentID} feedID={item.feed_id} refetchCallback={refetchCallBack} mentionedUser={item.user.name} />
              }
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Replies;
