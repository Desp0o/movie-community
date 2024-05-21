import { useDispatch } from "react-redux";
import BackDrop from "../backDrop/BackDrop";
import LoginModalBtn from "../login/LoginModalBtn";
import CreateTitle from "./addPostComps/CreateTitle";
import PostAuthor from "./addPostComps/PostAuthor";
import PostTextarea from "./addPostComps/PostTextarea";
import { setAddPostModal } from "../../Redux/postModal";
import React, { useEffect, useRef, useState } from "react";
import { useUserHook } from "../../hooks/useUserHook";
import axios from "axios";
import { setRefetch } from "../../Redux/RefetchSlicer";
import { useRefetchHook } from "../../hooks/useRefetchHook";
import { toast } from "react-toastify";
import { setSpinnerState } from "../../Redux/spinnerSlicer";
import PostStyle from "./addPostComps/PostStyle";
import { addMediaIocn } from "../../assets/svg/addMediaIcon";

interface PostEditPopUpProps{
  closeEditPostModal: () => void;
  postID: number | string;
}

const PostEditPopUp:React.FC<PostEditPopUpProps> = ({closeEditPostModal, postID}) => {
  const notify = () =>
    toast.success("Post Added Updated !", {
      autoClose: 1000,
      theme: "colored",
    });
  const notifyError = () =>
    toast.error("Error", { autoClose: 1000, theme: "colored" });
  const dispatch = useDispatch();
  const { user } = useUserHook();
  const { requestRefetch } = useRefetchHook();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [uploadedImage, setUploadedImage] = useState<string>("");
  const [uploadedVideo, setUploadedVideo] = useState("");
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
    type: null,
  });

  useEffect(()=>{
    const getPost = async () => {
      const token = localStorage.getItem('token')
      dispatch(setSpinnerState(true))
      try {
        const response = await axios.get(`${import.meta.env.VITE_SINGLE_AUTH_POST}${postID}`,{
          headers:{
            Authorization: `Bearer ${token}`
          }
        })
        console.log(response.data);
  
        setPostValue(
          {
            ...postValue, 
            text: response.data.post.text ? response.data.post.text : '',
          }
        )
      } catch (error) {
        console.error(error)
      }finally{
        dispatch(setSpinnerState(false))
      }
    }

    getPost()
  },[])


const editPost = async () => {
  const token = localStorage.getItem('token')
  dispatch(setSpinnerState(true))
console.log(postValue);

  try {
    await axios.post(`${import.meta.env.VITE_POST_EDIT}${postID}`,postValue, {
      headers:{
        Authorization:  `Bearer ${token}`
      }
    })
    dispatch(setRefetch(!requestRefetch))
    closeEditPostModal()    
    notify()
  } catch (error) {
    console.error(error)
    notifyError()
  }finally{
    dispatch(setSpinnerState(false))
  }
}




  useEffect(() => {
    if (postValue.img?.type.includes("video")) {
      setPostValue({ ...postValue, type: 1 });
      setUploadedImage("");
    }

    if (postValue.img?.type.includes("image")) {
      setPostValue({ ...postValue, type: 0 });
      setUploadedVideo("");
    }
    //eslint-disable-next-line
  }, [postValue.img]);

  //სურათის ასატვირთი ფუნქცია
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.includes("image")) {
        setUploadedImage(URL.createObjectURL(file));
      }

      if (file.type.includes("video")) {
        setUploadedVideo(URL.createObjectURL(file));
      }
      dispatch(
        setAddPostModal({
          defaultPost: false,
          pollPost: false,
          showPostButtons: false,
        })
      );
    }

    setPostValue({ ...postValue, img: file });
  };

  const handleChange = (event: {
    target: {
      value: string;
      style: { height: string };
      scrollHeight: number;
    };
  }) => {
    event.target.style.height = `${event.target.scrollHeight}px`;
    setPostValue({ ...postValue, text: event.target.value });
  };

  const clearMedia = () => {
    setUploadedImage('')
    setUploadedVideo('')
    setPostValue({...postValue, img:undefined, type: null})
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset the file input value
    }
  }

  const click = () => {
    fileInputRef.current && fileInputRef.current.click(); //ინპუტზე დაკლიკების იმიტაცია

  }

  useEffect(()=>{
    if (postValue.text !== '' && (uploadedImage || uploadedVideo)) {
      // ტექსტარეას სიმაღლის ცლილებაზე გაიზარდოს ტექსტარეაც
      if(textareaRef.current){
        textareaRef.current.style.height = "32px"
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
    }

    // თუ ტექსტარეა ცარიელია და სურათი არსებობს მაშინ დაუბრუნდეს საწყის ზომას 
    if(textareaRef.current && postValue.text === '' && (uploadedImage || uploadedVideo)){
      textareaRef.current.style.height = "32px"
    }

    if(textareaRef.current && postValue.text === '' && (!uploadedImage || !uploadedVideo)){
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }

  },[postValue.img, postValue.text, uploadedImage, uploadedVideo])

  return (
      <div style={{ width: "100%" }} className="edit_post">
        <BackDrop funcName={closeEditPostModal} />
        <div className="AddPostPopUp_parent">
          <div className="AddPostPopUp">
            <CreateTitle
              title={"Edit Post"}
              funcName={closeEditPostModal}
            />
            <div className="post_body">
              <PostAuthor />
              <PostTextarea
                postValieProp={postValue.text}
                handleChangeProp={handleChange}
                uploadedImageProp={uploadedImage ? uploadedImage : ''}
                fileInputRefProp={fileInputRef}
                handleFileChangeProp={handleFileChange}
                uploadedVideoProp={uploadedVideo}
                clearMediaProp={clearMedia} 
                textareaRefProp={textareaRef}            
                />

            </div>
            <PostStyle styleName={"Photo/video"} styleIocn={addMediaIocn} funcName={click}/>

            <div className="add_post_popup_btn">
              <LoginModalBtn title={"Update"} btnWidth="480px" funName={editPost} />
            </div>
          </div>
        </div>
      </div>
    )
  
};

export default PostEditPopUp;
