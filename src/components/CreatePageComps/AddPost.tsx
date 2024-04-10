import { useState, useRef } from "react";
import "./CreatePageStyles.css";
import SendPostBTN from "./SendPostBTN";




const AddPost = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  
  

  const [postValue, setPostValue] = useState({
    image: "",
    title: "",
    body: "",
  });

  const handlePostTitle = (event: { target: { value: string; }; }) => {
    setPostValue({ ...postValue, title: event.target.value });
  };

  // const handlePostBody = (value: string) => {
  //   setPostValue({ ...postValue, body: value });
  // };

  const handleButtonClick = () => {
    fileInputRef.current && fileInputRef.current.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log('Selected file:', file);
  };





  return (
    <div className="add_post">

      <div className="upload_image" onClick={handleButtonClick}>
        <p style={{color:"currentcolor"}}>ატვირთე სურათი</p>
      </div>

      <input ref={fileInputRef} type="file" onChange={handleFileChange} style={{display:'none'}}/>
      
      <input
        type="text"
        className="input_style_createPage"
        placeholder="სათაური"
        onChange={handlePostTitle}
      />
      <div className="quill_container">
      </div>

      <SendPostBTN />
    </div>
  );
};

export default AddPost;
