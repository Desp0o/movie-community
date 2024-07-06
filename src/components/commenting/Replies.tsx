import React, { useEffect, useRef, useState } from 'react';
import { dotsForComments } from '../../assets/newSvg/dotsForComments';
import { useUserHook } from '../../hooks/useUserHook';
import SettingForComment from './SettingForComment';
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from 'react-query';
import ReplayComment from './ReplayComment';
import CommentLikeSection from './CommentLikeSection';
import DateFormater from '../dateFormater/DateFormater';
import { useDispatch, useSelector } from 'react-redux';
import { setSecondaryReplayInput } from '../../Redux/commentsSlicer';
import { editComment } from './EDITcomment';

interface RepliesProps {
  replayedComments: {
    created_at: string;
    myRepGul: number;
    id: number;
    text: string;
    user_id: number;
    feed_id: number;
    guls: number;
    user: {
      name: string;
    }
  }[];
  mainCommentID: number;
  refetchCallBack: <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) => Promise<QueryObserverResult<any, unknown>>;
}

interface CommentProp {
  text?: string;
}

interface fetchedDataProps {
  created_at: string;
  text: string;
  myRepGul: number;
  id: number;
  feed_id: number;
  user_id: number;
  guls: number;
  user: {
    name: string;
  }
}

interface RootState {
  comRepStroe: {
    secondaryReplay: boolean
  }
}

const Replies: React.FC<RepliesProps> = ({ mainCommentID, replayedComments, refetchCallBack }) => {
  const dispatch = useDispatch();
  const secondaryReplayRedux = useSelector((state: RootState) => state.comRepStroe.secondaryReplay);
  const { user } = useUserHook();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [replIndex, setReplIndex] = useState<number | null>(null);
  const commentPanelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [fetchedRepliesData, setFetchedRepliesData] = useState<fetchedDataProps[]>([]);
  const [isReadyEdit, setIsReadyEdit] = useState({
    isReady: false,
    comID: 0
  });

  useEffect(() => {
    if (replayedComments && Array.isArray(replayedComments)) {
      const reversed = replayedComments.map(comment => ({
        ...comment,
        text: comment.text || '', // Ensure text is a string
      })).reverse();
      setFetchedRepliesData(reversed);
    }
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

  useEffect(() => {
    if (!secondaryReplayRedux) {
      setReplIndex(null);
    }
  }, [secondaryReplayRedux]);

  const highlightMentions = (text = '') => {
    const mentionRegex = /@[\w]+\s[\w]+/g; // Matches @ followed by words with spaces
    const combined = [];

    let match;
    let lastIndex = 0;

    // Use regex to find all mentions in the text
    while ((match = mentionRegex.exec(text)) !== null) {
        const { 0: mention, index: matchIndex } = match;

        // Add text before the mention
        if (matchIndex > lastIndex) {
            combined.push(text.slice(lastIndex, matchIndex));
        }

        // Add the mention with styling
        combined.push(
            <span key={matchIndex} style={{ color: '#309782', fontWeight: '500', wordWrap: 'break-word' }}>
                {mention}
            </span>
        );

        // Update the last index
        lastIndex = mentionRegex.lastIndex;
    }

    // Add the remaining text after the last mention
    if (lastIndex < text.length) {
        combined.push(text.slice(lastIndex));
    }

    return combined;
};



  const Comment: React.FC<CommentProp> = ({ text = '' }) => {
    return <p className="replayed_comment_text">{highlightMentions(text)}</p>;
  };

  const showReplay = (index: number) => {
    if(isReadyEdit.isReady){
      setReplIndex((prevIndex) => (prevIndex === index ? index : index));
    }else{
      setReplIndex((prevIndex) => (prevIndex === index ? null : index));
    }
    dispatch(setSecondaryReplayInput());
    setIsReadyEdit({...isReadyEdit,isReady:false})
  };

  const editReplay = (id: number, index: number) => {
    setIsReadyEdit({ ...isReadyEdit, isReady: true, comID: id });
    setReplIndex(index);
    dispatch(setSecondaryReplayInput())
  };

  return (
    <>
      {fetchedRepliesData.map((item, index) => (
        <div key={index} className='csmp'>
          <div className="replayed_comment_parent">
            <div className='replayed_comment_inner_parent'>
              <p className='replayed_comment_user_name'>{item.user.name}</p>
              <div className="replayed_comment">
                <Comment text={item.text} />
                <div ref={(el) => (commentPanelRefs.current[index] = el)} className="comment_panel_and_dots">
                  <div>
                    {index === activeIndex && <SettingForComment commentID={item.id} refetchCallbac={refetchCallBack} editCom={() => editReplay(item.id, index)} />}
                  </div>
                  <div onClick={() => showSettings(index)} className='dot_normal_pos'>
                    {item.user_id === user.userID && dotsForComments}
                  </div>
                </div>
              </div>
              <div className='rrg'>
                <DateFormater date={item.created_at} />
                <CommentLikeSection myRepGul={item.myRepGul} guls={item.guls} commentId={item.id} />
                <p className='single_comment_replay' onClick={() => showReplay(index)}>
                  Replay
                </p>
              </div>
            </div>
          </div>
          <div className={(replIndex === index && secondaryReplayRedux) ? 'replay_container visible' : 'replay_container'}>
            <div className='replay_for_replie'>
              <>
                {!isReadyEdit.isReady && <ReplayComment id={mainCommentID} feedID={item.feed_id} refetchCallback={refetchCallBack} mentionedUser={item.user.name} />}
                {isReadyEdit.isReady && <EditReplay commentID={item.id} text={item.text} refetchCallback={refetchCallBack} />}
              </>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Replies;

interface EditReplayProps {
  commentID: number;
  text: string;
  refetchCallback: () => void;
}

const EditReplay: React.FC<EditReplayProps> = ({ commentID, text, refetchCallback }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [commentValue, setCommentValue] = useState<{
    img: File | undefined;
    text: string;
}>({
    img: undefined,
    text: text,
});

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "36px";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;

      if (textareaRef.current.scrollHeight > 200) {
        textareaRef.current.style.height = '200px';
        textareaRef.current.style.overflow = 'auto';
      } else {
        textareaRef.current.style.overflow = 'hidden';
      }
    }
    console.log(commentValue);
    
  }, [commentValue]);



  return (
    <div className="single_Replay">
      <textarea
        dir='ltr'
        className="replay_textarea"
        ref={textareaRef}
        placeholder=''
        onChange={(e) => setCommentValue({...commentValue, text: e.target.value})}
        value={commentValue.text}
      />
      <div className="replay_btn active" onClick={()=> editComment(refetchCallback, commentID, commentValue, setCommentValue({...commentValue, text: ""}))}>
        <p>Edit</p>
      </div>
    </div>
  );
};
