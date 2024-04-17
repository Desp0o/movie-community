import { useState, useRef, useEffect } from "react";
import "./CreatePageStyles.css";
import axios from "axios";
import { useUserHook } from "../../hooks/useUserHook";
import AddPostResponsive from "./addPostResponsive";
import AddPostDesktop from "./addPostDesktop";
import Fetching from "../fetchingComponent/Fetching";
import { setResponsivePostAddState } from "../../Redux/ResposnivePostAddSlice";
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRefetchHook } from "../../hooks/useRefetchHook";
import { setRefetch } from "../../Redux/RefetchSlicer";


const AddPost = () => {
  const notify = () => toast.success('Post Added Successfully !',{ autoClose: 1000, theme: "colored" });
  const notifyError = () => toast.error('Error',{ autoClose: 1000, theme: "colored" });

  
  const token = localStorage.getItem('token')
  const { user } = useUserHook()
  const { requestRefetch } = useRefetchHook()
  const [isLoading, setLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [uploadedImage, setUploadedImage] = useState<string>('')
  const [postValue, setPostValue] = useState<{
    img: File | undefined;
    title: string;
    text: string;
    user_id: number | string;
    type: number | null;
  }>({
    img: undefined,
    title: "",
    text: "",
    user_id: user.userID,
    type: null
  });

  useEffect(()=>{

    if(postValue.img?.type.includes('video')){
      setPostValue({ ...postValue, type: 1 });
    }

    if(postValue.img?.type.includes('image')){
      setPostValue({ ...postValue, type: 0 });
    }
    
  },[postValue.img])

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

    setPostValue({ ...postValue, img: file });
  };

  const dispatch = useDispatch()
  const closeResPostModal = () => {
    dispatch(setResponsivePostAddState(false));
  };

  const sendPost = async () => {   
    setLoading(true)             
      try {
          const res = await axios.post(import.meta.env.VITE_POSTING , postValue, {
            headers: {
              Authorization:`Bearer ${token}`,
              'Content-Type': 'multipart/form-data, application/json, text/plain, */*'
            }
          })
          dispatch(setRefetch(!requestRefetch))
          closeResPostModal()
          setPostValue({...postValue, text:'', title:''})
          console.log(res.data);
          notify()
        } catch (error: any) {
          notifyError()
        }finally{
        setLoading(false)
      }
  }

  const CreatePost = () => {
    sendPost()
  }

  return (
  
   window.innerWidth > 601
    ?
    <>
    {isLoading ? <div className="backdropFilter"><Fetching /></div> : <></>}
    <AddPostDesktop 
      titleValueProp={postValue.title}
      textValueProp={postValue.text}
      handlePostTitleProp={handlePostTitle}
      handlePostBodyProp={handlePostBody}
      handleFileChangeProp={handleFileChange}
      fileInputRefProp={fileInputRef}
      handleButtonClickProp={handleButtonClick}
      uploadedImageProp={uploadedImage} 
      CreatePostProp={CreatePost}
    />
    </>
    :
    <>
    {isLoading ? <div className="backdropFilter"><Fetching /></div> : <></>}
    <AddPostResponsive 
      titleValueProp={postValue.title}
      textValueProp={postValue.text}
      sendPostProp={sendPost} 
      handlePostTitleProp={handlePostTitle} 
      handlePostBodyProp={handlePostBody} 
      handleFileChangeProp={handleFileChange} 
      fileInputRefProp={fileInputRef} 
      handleButtonClickProp={handleButtonClick} 
      uploadedImageProp={uploadedImage} 
    />
    </>
  );
};

export default AddPost;
