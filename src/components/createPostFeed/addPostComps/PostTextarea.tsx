import React, { RefObject } from "react";
import { smileIcon } from "../../../assets/svg/smileIcon";

interface PostTextareaProps {
  postValieProp: string;
  handleChangeProp: (event: {
    target: { value: string; style: { height: string }; scrollHeight: number };
  }) => void;
  uploadedImageProp: string;
  fileInputRefProp: RefObject<HTMLInputElement>;
  handleFileChangeProp: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PostTextarea: React.FC<PostTextareaProps> = ({
  postValieProp,
  handleChangeProp,
  uploadedImageProp,
  fileInputRefProp,
  handleFileChangeProp,
}) => {
  return (
    <div className="post_txtarea_smile">
      <textarea
        className="popup_textarea"
        placeholder="Write post..."
        value={postValieProp}
        onChange={handleChangeProp}
      />
      <span>{smileIcon}</span>

      {uploadedImageProp && (
        <div className="uploaded_image_addPost_container">
          <img
            src={uploadedImageProp}
            alt="uploaded post img"
            className="uploaded_image_addPost"
          />
        </div>
      )}

      <input
        ref={fileInputRefProp}
        type="file"
        onChange={handleFileChangeProp}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default PostTextarea;
