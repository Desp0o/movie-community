import React, { RefObject } from "react";
import { useDarkModeHook } from "../../hooks/useDarkModeHook";
import { useResPostModal } from "../../hooks/useResPostModal";
import { setResponsivePostAddState } from "../../Redux/ResposnivePostAddSlice";
import { useDispatch } from "react-redux";
import { xIcon } from "../../assets/svg/Xicon";
import { pictureIcon } from "../../assets/svg/pictureIcon";

interface AddPostResponsiveProps {
  sendPostProp: () => void;
  handlePostTitleProp: (event: {target: {value: string;};}) => void;
  handlePostBodyProp: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleFileChangeProp: (event: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRefProp: RefObject<HTMLInputElement>;
  handleButtonClickProp: () => void;
  uploadedImageProp: string;
  titleValueProp:string;
  textValueProp: string;
}

const AddPostResponsive: React.FC<AddPostResponsiveProps> = ({
  sendPostProp,
  handlePostTitleProp,
  handlePostBodyProp,
  handleFileChangeProp,
  fileInputRefProp,
  handleButtonClickProp,
  uploadedImageProp,
  titleValueProp,
  textValueProp
}) => {
  const { isDark } = useDarkModeHook();
  const { resPostModal } = useResPostModal();
  const dispatch = useDispatch();

  const closeResPostModal = () => {
    dispatch(setResponsivePostAddState(false));
  };

  return (
    <div
      className={
        resPostModal ? "responsive_add_post active" : "responsive_add_post"
      }
    >
      <div
        className={isDark ? "res_post_add_inner dark" : "res_post_add_inner"}
      >
        <div className="close_add">
          <span style={{ cursor: "pointer" }} onClick={closeResPostModal}>
            {xIcon}
          </span>
          <div className="res_add_btn" onClick={sendPostProp}>
            <p>add</p>
          </div>
        </div>

        <input
          value={titleValueProp}
          type="text"
          className="input_style_createPage"
          placeholder="სათაური"
          onChange={handlePostTitleProp}
        />

        <textarea
          value={textValueProp}
          className="post_body"
          onChange={handlePostBodyProp}
          placeholder="Description (optional)"
        />
        <input
          ref={fileInputRefProp}
          multiple
          type="file"
          onChange={handleFileChangeProp}
          style={{ display: "none" }}
        />

        <div className="media_upload">
          <span onClick={handleButtonClickProp}>{pictureIcon}</span>

          <span style={{ position: "relative" }}>
            {uploadedImageProp ? (
              <img
                src={uploadedImageProp}
                style={{ width: "40px", height: "40px", objectFit: "contain" }}
              />
            ) : (
              <></>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AddPostResponsive;
