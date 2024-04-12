import { useState, useRef } from "react";
import "./CreatePageStyles.css";
import SendPostBTN from "./SendPostBTN";
import axios from "axios";

const AddPost = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [postValue, setPostValue] = useState({
    img: [] as File[],
    title: "",
    text: "",
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
    const files = event.target.files;
    if (files) {
      const fileList = Array.from(files); // Convert FileList to an array
      setPostValue({ ...postValue, img: fileList });
    }
  };

  const sendPost = async () => {            
      try {
          const res = await axios.post('https://api.pinky.ge/api/posting' , postValue, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })

          console.log(res.data);
      } catch (error) {
          console.log(error);
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
