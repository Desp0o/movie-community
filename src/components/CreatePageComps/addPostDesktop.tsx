import React, { RefObject } from "react";
import SendPostBTN from "./SendPostBTN";
import { useDarkModeHook } from "../../hooks/useDarkModeHook";
import { xIcon } from "../../assets/svg/Xicon";
import { useDispatch } from "react-redux";
import { setResponsivePostAddState } from "../../Redux/ResposnivePostAddSlice";
import { useResPostModal } from "../../hooks/useResPostModal";

interface AddPostDesktopProps {
  CreatePostProp: () => void;
  handlePostTitleProp: (event: { target: { value: string } }) => void;
  handlePostBodyProp: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleFileChangeProp: (event: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRefProp: RefObject<HTMLInputElement>;
  handleButtonClickProp: () => void;
  uploadedImageProp: string;
  titleValueProp: string;
  textValueProp: string;
}

const AddPostDesktop: React.FC<AddPostDesktopProps> = ({
  CreatePostProp,
  handleButtonClickProp,
  fileInputRefProp,
  handleFileChangeProp,
  handlePostTitleProp,
  handlePostBodyProp,
  titleValueProp,
  textValueProp,
}) => {

  const { isDark } = useDarkModeHook()
  const { resPostModal } = useResPostModal();
  const dispatch = useDispatch();

  const closeResPostModal = () => {
    dispatch(setResponsivePostAddState(false));
  };

  return (
    <div className={resPostModal ? "add_post_desktop active" : "add_post_desktop"}>
      <div className={isDark ? "add_post dark" : "add_post"}>
        <span style={{ cursor: "pointer"}} onClick={closeResPostModal}>
              {xIcon}
            </span>
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
          value={titleValueProp}
          type="text"
          className="input_style_createPage"
          placeholder="სათაური"
          onChange={handlePostTitleProp}
        />

        <textarea value={textValueProp} className="post_body" onChange={handlePostBodyProp} placeholder="Description (optional)"/>
        <SendPostBTN funName={CreatePostProp} />
      </div>
    </div>
  );
};

export default AddPostDesktop;
