import React, { RefObject } from "react";
import { smileIcon } from "../../../assets/svg/smileIcon";
import ReactPlayer from "react-player";
import { xIcon } from '../../../assets/svg/Xicon';

interface PostTextareaProps {
  postValieProp: string;
  handleChangeProp: (event: {
    target: { value: string; style: { height: string }; scrollHeight: number };
  }) => void;
  uploadedImageProp: string;
  fileInputRefProp: RefObject<HTMLInputElement>;
  handleFileChangeProp: (event: React.ChangeEvent<HTMLInputElement>) => void;
  uploadedVideoProp: string;
  clearMediaProp: () => void;
  textareaRefProp: RefObject<HTMLTextAreaElement>;
}

const PostTextarea: React.FC<PostTextareaProps> = ({
  postValieProp,
  handleChangeProp,
  uploadedImageProp,
  fileInputRefProp,
  handleFileChangeProp,
  uploadedVideoProp,
  clearMediaProp,
  textareaRefProp
}) => {
  return (
    <div className="post_txtarea_smile">
      <div className="postTextarea_and_smile_parent">
      <textarea
        className="popup_textarea"
        placeholder="Write post..."
        value={postValieProp}
        onChange={handleChangeProp}
        ref={textareaRefProp}
      />
      <span className="smile_icon_postadd">{smileIcon}</span>
      </div>

      <div className="uploaded_image_addPost_container">
        <span style={{width:"32px", height:"32px", cursor:"pointer"}} onClick={clearMediaProp}>{xIcon}</span>

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
