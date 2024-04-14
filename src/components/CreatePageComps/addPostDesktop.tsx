import React, { RefObject } from "react";
import SendPostBTN from "./SendPostBTN";

interface AddPostDesktopProps {
  CreatePostProp: () => void;
  handlePostTitleProp: (event: { target: { value: string } }) => void;
  handlePostBodyProp: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleFileChangeProp: (event: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRefProp: RefObject<HTMLInputElement>;
  handleButtonClickProp: () => void;
  uploadedImageProp: string;
}

const AddPostDesktop: React.FC<AddPostDesktopProps> = ({
  CreatePostProp,
  handleButtonClickProp,
  fileInputRefProp,
  handleFileChangeProp,
  handlePostTitleProp,
  handlePostBodyProp,
}) => {
  return (
    <div className="add_post">
      <div className="upload_image" onClick={handleButtonClickProp}>
        <p style={{ color: "currentcolor" }}>ატვირთე სურათი</p>
      </div>

      <input
        ref={fileInputRefProp}
        multiple
        type="file"
        onChange={handleFileChangeProp}
        style={{ display: "none" }}
      />

      <input
        type="text"
        className="input_style_createPage"
        placeholder="სათაური"
        onChange={handlePostTitleProp}
      />

      <textarea className="post_body" onChange={handlePostBodyProp} />
      <SendPostBTN funName={CreatePostProp} />
    </div>
  );
};

export default AddPostDesktop;
