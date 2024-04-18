import React, { useState } from "react";
import { useUserHook } from "../../hooks/useUserHook";
import { deleteComment } from "./DELcomment";
import { editComment } from "./EDITcomment";

interface Comment {
  id: number;
  text: string;
  img: string;
  user_id:string
}

interface ComProps {
  fetchedComments: Comment[];
  callback:()=>void
}

const CommentsSection: React.FC<ComProps> = ({ fetchedComments, callback }) => {
  const imageStoragePath = import.meta.env.VITE_COMMENT_IMAGE;
  const {user} = useUserHook()

  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [commentValue, setCommentValue] = useState<{
    text: string;
  }>({
    text: "",
  });


  return (
    <div style={{display:"flex" , flexDirection:"column", gap:"30px"}}>
      {fetchedComments?.map((item) => (
        <div key={item.id}>
          {Number(item.user_id) === Number(user.userID) && (<p
            onClick={() => setEditingCommentId(item.id)}
            style={{ color: "pink", fontWeight: "900" }}
          >
            EDIT POST
          </p>)}
          <div onClick={() => deleteComment(item.id, callback)}>
            <p>{item.text}</p>
            {item.img ? (
              <img
                style={{ width: "50px" }}
                src={`${imageStoragePath}${item.img}.webp`}
                alt="Comment"
              />
            ) : (
              <></>
            )}
          </div>
          {editingCommentId === item.id && Number(user.userID) === Number(item.user_id) &&  (
            <div className="comment_container">
              <textarea
                className="comment_textarea"
                value={commentValue.text}
                onChange={(event) => {
                  setCommentValue({
                    ...commentValue,
                    text: event.target.value,
                  });
                }}
                placeholder="Write your comment here..."
              />
              
              <button
                className="comment_ntm"
                onClick={() => editComment(callback, item.id, commentValue, setEditingCommentId)}
              >
                edit comment
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CommentsSection;
