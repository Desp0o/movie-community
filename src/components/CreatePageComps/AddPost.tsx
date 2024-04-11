import { useState, useRef, useEffect } from "react";
import "./CreatePageStyles.css";
import SendPostBTN from "./SendPostBTN";

const AddPost = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [postValue, setPostValue] = useState({
    image: [] as File[],
    title: "",
    body: "",
  });

  const handlePostTitle = (event: { target: { value: string; }; }) => {
    setPostValue({ ...postValue, title: event.target.value });
  };

  const handlePostBody = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostValue({ ...postValue, body: event.target.value });
  };

  const handleButtonClick = () => {
    fileInputRef.current && fileInputRef.current.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileList = Array.from(files); // Convert FileList to an array
      setPostValue({ ...postValue, image: fileList });
    }
  };


  useEffect(()=>{
    console.log(postValue);
    
  },[postValue])

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

      <SendPostBTN />
    </div>
  );
};

export default AddPost;
