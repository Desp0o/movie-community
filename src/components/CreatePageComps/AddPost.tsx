import { useState, useRef, useEffect } from "react";
import "./CreatePageStyles.css";
import SendPostBTN from "./SendPostBTN";
import axios from "axios";
import { useUserHook } from "../../hooks/useUserHook";

const token = localStorage.getItem('token')

const AddPost = () => {
  const { user } = useUserHook()
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
          const res = await axios.post('https://api.pinky.ge/api/posting' , postValue, {
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
    <div className="add_post">

      <div className="upload_image" onClick={handleButtonClick}>
        <p style={{color:"currentcolor"}}>ატვირთე სურათი</p>
      </div>

      <input ref={fileInputRef} multiple type="file" onChange={handleFileChange} style={{display:'none'}}/>
      
      <input
        type="text"
        className="input_style_createPage"
        placeholder="სათაური"
        onChange={handlePostTitle}
      />
      
      <textarea className="post_body" onChange={handlePostBody}/>


      <SendPostBTN funName={CreatePost}/>
    </div>
  );
};

export default AddPost;
