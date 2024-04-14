import { useState, useRef } from "react";
import "./CreatePageStyles.css";
import SendPostBTN from "./SendPostBTN";
import axios from "axios";
import { useUserHook } from "../../hooks/useUserHook";
import { useDarkModeHook } from "../../hooks/useDarkModeHook";
import { xIcon } from "../../assets/svg/Xicon";

const token = localStorage.getItem('token')

const AddPost = () => {
  const { user } = useUserHook()
  const { isDark } = useDarkModeHook()
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  return (
   window.innerWidth > 769 
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
    <div className="responsive_add_post active">
      <div className={isDark ? "res_post_add_inner dark" : "res_post_add_inner"}>
        <div className="close_add">
          {xIcon}
          <div className="res_add_btn">
            <p>add</p>
          </div>
        </div>

        <input
        type="text"
        className="input_style_createPage"
        placeholder="სათაური"
        onChange={handlePostTitle}
      />
      </div>
    </div>
  );
};

export default AddPost;
