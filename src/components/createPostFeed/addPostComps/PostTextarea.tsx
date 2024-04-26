import React, { RefObject } from "react";
import { smileIcon } from "../../../assets/svg/smileIcon";
import ReactPlayer from "react-player";
import { xIcon } from "../../../assets/svg/Xicon";

interface PostTextareaProps {
  postValieProp: string;
  handleChangeProp: (event: {
    target: { value: string; style: { height: string }; scrollHeight: number };
  }) => void;
  uploadedImageProp: string;
  fileInputRefProp: RefObject<HTMLInputElement>;
  handleFileChangeProp: (event: React.ChangeEvent<HTMLInputElement>) => void;
  uploadedVideoProp: string;
  clearMediaProp: () => void
}

const PostTextarea: React.FC<PostTextareaProps> = ({
  postValieProp,
  handleChangeProp,
  uploadedImageProp,
  fileInputRefProp,
  handleFileChangeProp,
  uploadedVideoProp,
  clearMediaProp
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

      <div className="uploaded_image_addPost_container">
        <span onClick={clearMediaProp}>{xIcon}</span>

        {uploadedImageProp && (
          <img
            src={uploadedImageProp}
            alt="uploaded post img"
            className="uploaded_image_addPost"
          />
        )}

        {uploadedVideoProp && (
          <ReactPlayer
            className="video_popupPorst_add"
            url={`${uploadedVideoProp}`}
            muted={true}
            width="100%"
            height="100%"
            config={{
              file: {
                attributes: {
                  controlsList: "nodownload",
                  playsInline: true,
                },
              },
            }}
          />
        )}
      </div>

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
