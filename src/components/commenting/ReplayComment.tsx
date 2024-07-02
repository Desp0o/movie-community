import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import "../../pages/post.css";

interface ReplayCommentProps {
  id: number;
  feedID: number;
  refetchCallback: () => void;
  mentionedUser: string;
  setter?:()=>void
}

const ReplayComment: React.FC<ReplayCommentProps> = ({id, feedID, refetchCallback, mentionedUser, setter }) => {
  const textareaRef = useRef<HTMLDivElement>(null);
  const [replayValue, setReplayValue] = useState('');
  const [isFaded, setFaded] = useState(true);

  useEffect(() => {
    if (replayValue.length > 0) {
      setFaded(false);
    } else {
      setFaded(true);
    }
  }, [replayValue]);

  const sendReplay = async () => {
    const token = localStorage.getItem('token');

    if (replayValue !== '') {
      try {
        const res = await axios.post(`${import.meta.env.VITE_ADD_COMMENT}${feedID}`, {
          text: replayValue,
          img: null,
          comment_id: id
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setReplayValue('');
        setFaded(true);
        console.log(res.data);
        if(setter){
          setter()
        }
      } catch (error) {
        console.error(error);
      } finally {
        refetchCallback();
      }
    }
  };

  useEffect(() => {
    const handleInput = () => {
      if (textareaRef.current) {
        textareaRef.current.style.height = "36px";
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;

        if (textareaRef.current.scrollHeight > 200) {
          textareaRef.current.style.height = '200px';
          textareaRef.current.style.overflow = 'auto';
        } else {
          textareaRef.current.style.overflow = 'hidden';
        }

        // Check if the mention is deleted and reinsert it if necessary
        const textContent = textareaRef.current.innerText;
        if (!textContent.includes(`@${mentionedUser}`)) {
          const pTag = document.createElement('p')
          pTag.className = 'text_after_mentioned_user'

          const span = document.createElement("span")
          span.className = 'mentioned_user'

          pTag.appendChild(span)
          textareaRef.current.appendChild(pTag)
          span.textContent = `@${mentionedUser}`
          span.contentEditable = 'false'
        }
      }
    };

    const div = textareaRef.current;
    div?.addEventListener('input', handleInput);
    
    return () => {
      div?.removeEventListener('input', handleInput);
    };
  }, [mentionedUser]);


  return (
    <div className="single_Replay">
      <div
        contentEditable
        ref={textareaRef}
        className="replay_textarea" 
        onInput={(e) => setReplayValue(e.currentTarget.innerText)}
        suppressContentEditableWarning={true} // Add this line to suppress the warning
      >
        <p dir='ltr' className='text_after_mentioned_user'>
        <span contentEditable={false} className='mentioned_user'>@{mentionedUser}&nbsp;&nbsp;</span>
        </p>
      </div>
      <span onClick={sendReplay}><ReplayBtn faded={isFaded} /></span>
    </div>
  );
};

export default ReplayComment;

interface ReplayBtnProps {
  faded: boolean;
}

export const ReplayBtn: React.FC<ReplayBtnProps> = ({ faded }) => {
  return (
    <div className={faded ? "replay_btn" : "replay_btn active"}>
      <p>Replay</p>
    </div>
  );
};
