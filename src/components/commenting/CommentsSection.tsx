import axios from "axios";
import React, { useState } from "react";

interface Comment {
  id: number;
  text: string;
  img: string;
}

interface ComProps {
  fetchedComments: Comment[];
}

const CommentsSection: React.FC<ComProps> = ({ fetchedComments }) => {
  const imageStoragePath = import.meta.env.VITE_COMMENT_IMAGE;
  const token = localStorage.getItem("token");

  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [commentValue, setCommentValue] = useState<{
    img: File | undefined;
    text: string;
  }>({
    img: undefined,
    text: "",
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // setUploadedImage(URL.createObjectURL(file));
    }
    setCommentValue({ ...commentValue, img: file });
  };

  const deleteComment = async (comID: number) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_DEL_COMMENT}${comID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const editComment = async (comID: number) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_EDIT_COMMENT}${comID}`,
        commentValue,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      setEditingCommentId(null); // Reset editing state after successful edit
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {fetchedComments?.map((item) => (
        <div key={item.id}>
          <p
            onClick={() => setEditingCommentId(item.id)}
            style={{ color: "pink", fontWeight: "900" }}
          >
            EDIT POST
          </p>
          <div onClick={() => deleteComment(item.id)}>
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
          {editingCommentId === item.id && (
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
              <input multiple type="file" onChange={handleFileChange} />
              <button
                className="comment_ntm"
                onClick={() => editComment(item.id)}
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
