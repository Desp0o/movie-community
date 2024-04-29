import React, { SetStateAction, useState } from "react";
import { useUserHook } from "../../hooks/useUserHook";
import { useDispatch } from "react-redux";
import { setModalVisible } from "../../Redux/loginModalSlicer";
import axios from "axios";

interface addCommentProps {
  postID: number | undefined | string;
  callBack: ()=>void
}

const AddComment: React.FC<addCommentProps> = ({ postID, callBack }) => {
  const token = localStorage.getItem("token");
  const [commentValue, setCommentValue] = useState<{
    img: File | undefined;
    text: string;
  }>({
    img: undefined,
    text: "",
  });
  const { user } = useUserHook();
  const dispatch = useDispatch();

  const handleChange = (event: {
    target: {
      value: SetStateAction<string>;
      style: {
        overflow: string; height: string 
};
      scrollHeight: number;
    };
  }) => {
    event.target.style.height = "48px";
    event.target.style.height = `${event.target.scrollHeight}px`;
    if (parseInt(event.target.style.height) > 48) {
      event.target.style.overflow = "auto";
  }
  };

  const handleCommentValues = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentValue({ ...commentValue, text: event.target.value });
  };

  //თუ არ არის ავტორიზებული გამოუჩინოს ლოიგნის პანელი
  const logInHandler = () => {
    dispatch(setModalVisible(true));
  };

  if (!user.name) {
    return (
      <p>
        please{" "}
        <span
          onClick={logInHandler}
          style={{ color: "var(--reddit)", cursor: "pointer" }}
        >
          log in
        </span>{" "}
        to leave comment.
      </p>
    );
  }

  const addComment = async () => {
    try {
       await axios.post(
        `${import.meta.env.VITE_ADD_COMMENT}${postID}`,
        commentValue,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type":
              "multipart/form-data, application/json, text/plain, */*",
          },
        }
      );

      callBack()
    } catch (error:unknown) {
      console.error(error);
    }
  };

  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     // setUploadedImage(URL.createObjectURL(file));
  //   }

  //   setCommentValue({ ...commentValue, img: file });
  // };

  return (
    <div className="comment_container">
      {user.avatar && <img src={user?.avatar} alt="user avatar" className="comment_user_avatar"/>}
      <textarea
        className="comment_textarea"
        value={commentValue.text}
        onChange={(event) => {
          handleChange(event);
          handleCommentValues(event);
        }}
        placeholder="Write your comment here..."
      />

      {/* <input multiple type="file" onChange={handleFileChange} /> */}
      <div className="comment_ntm" onClick={addComment}>
        <p>Post</p>
      </div>
    </div>
  );
};

export default AddComment;
