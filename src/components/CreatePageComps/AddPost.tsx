import { useState, useRef, useEffect } from "react";
import "./CreatePageStyles.css";
import axios from "axios";
import { useUserHook } from "../../hooks/useUserHook";
import AddPostResponsive from "./addPostResponsive";
import AddPostDesktop from "./addPostDesktop";

const token = localStorage.getItem('token')

const AddPost = () => {
  const { user } = useUserHook()
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  useEffect(()=>{
    console.log(postValue);
    
  },[postValue])

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

  return (
   window.innerWidth > 601
    ?
    <AddPostDesktop 
      handlePostTitleProp={handlePostTitle}
      handlePostBodyProp={handlePostBody}
      handleFileChangeProp={handleFileChange}
      fileInputRefProp={fileInputRef}
      handleButtonClickProp={handleButtonClick}
      uploadedImageProp={uploadedImage} 
      CreatePostProp={CreatePost}
    />
    :
    <AddPostResponsive 
      sendPostProp={sendPost} 
      handlePostTitleProp={handlePostTitle} 
      handlePostBodyProp={handlePostBody} 
      handleFileChangeProp={handleFileChange} 
      fileInputRefProp={fileInputRef} 
      handleButtonClickProp={handleButtonClick} 
      uploadedImageProp={uploadedImage} 
    />
  );
};

export default AddPost;
