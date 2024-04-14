import { useState, useRef } from "react";
import "./CreatePageStyles.css";
import SendPostBTN from "./SendPostBTN";
import axios from "axios";
import { useUserHook } from "../../hooks/useUserHook";
import { useDarkModeHook } from "../../hooks/useDarkModeHook";
import { xIcon } from "../../assets/svg/Xicon";
import { useResPostModal } from "../../hooks/useResPostModal";
import { useDispatch } from "react-redux";
import { setResponsivePostAddState } from "../../Redux/ResposnivePostAddSlice";
import { pictureIcon } from "../../assets/svg/pictureIcon";

const token = localStorage.getItem('token')

const AddPost = () => {
  const { user } = useUserHook()
  const { isDark } = useDarkModeHook()
  const { resPostModal } = useResPostModal()
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch()

  const [uploadedImage, setUploadedImage] = useState<string>('')
  const [postValue, setPostValue] = useState<{
    img: File | undefined;
    title: string;
    text: string;
    user_id: number | string;
  }>({
    img: undefined,
    title: "",
    text: "",
    user_id: user.userID,
  });

  

  const handlePostTitle = (event: { target: { value: string; }; }) => {
    setPostValue({ ...postValue, title: event.target.value });
  };

  const handlePostBody = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostValue({ ...postValue, text: event.target.value });
  };

  const handleButtonClick = () => {
    fileInputRef.current && fileInputRef.current.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedImage(URL.createObjectURL(file));
    }
    console.log(file);
    
    setPostValue({ ...postValue, img: file });
  };

  const sendPost = async () => {                
      try {
          const res = await axios.post(import.meta.env.VITE_POSTING , postValue, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data, application/json, text/plain, */*'
            }
          })

          console.log(res.data);
      } catch (error: any) {
          console.log(error.response.data);
      }
  }

  const CreatePost = () => {
    sendPost()
  }

  const closeResPostModal = () => {
    dispatch(setResponsivePostAddState(false))
  }

  return (
   window.innerWidth > 601
    ?
    <div className="add_post">
      <div className="upload_image" onClick={handleButtonClick}>
        <p style={{color:"currentcolor"}}>ატვირთე სურათი</p>
      </div>

      <input ref={fileInputRef} multiple type="file" accept="image/*" onChange={handleFileChange} style={{display:'none'}}/>
      
      <input
        type="text"
        className="input_style_createPage"
        placeholder="სათაური"
        onChange={handlePostTitle}
      />
      
      <textarea className="post_body" onChange={handlePostBody}/>
      <SendPostBTN funName={CreatePost}/>
    </div>
    :
    <div className={resPostModal ? "responsive_add_post active" : "responsive_add_post"}>
      <div className={isDark ? "res_post_add_inner dark" : "res_post_add_inner"}>
        <div className="close_add">
          <span style={{cursor:"pointer"}} onClick={closeResPostModal}>{xIcon}</span>
          <div className="res_add_btn" onClick={sendPost}>
            <p>add</p>
          </div>
        </div>

        <input
        type="text"
        className="input_style_createPage"
        placeholder="სათაური"
        onChange={handlePostTitle}
        />

        <textarea className="post_body" onChange={handlePostBody} placeholder="Description (optional)"/>
        <input ref={fileInputRef} multiple type="file" accept="image/*" onChange={handleFileChange} style={{display:'none'}}/>

        <div className="media_upload">
          <span onClick={handleButtonClick}>{pictureIcon}</span>

        <span style={{position:"relative"}}>
          {
            uploadedImage 
            ?
            <img src={uploadedImage} style={{width:"40px", height:"40px", objectFit:"contain"}}/>
            :
            <></>
          }
        </span>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
