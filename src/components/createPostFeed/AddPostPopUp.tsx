import { useDispatch } from "react-redux";
import BackDrop from "../backDrop/BackDrop";
import LoginModalBtn from "../login/LoginModalBtn";
import CreateTitle from "./addPostComps/CreateTitle";
import PostAuthor from "./addPostComps/PostAuthor";
import PostBottomButtons from "./addPostComps/PostBottomButtons";
import PostTextarea from "./addPostComps/PostTextarea";
import { setAddPostModal } from "../../Redux/postModal";
import { usePostAddModalHook } from "../../hooks/usePostAddModalHook";
import { useEffect, useRef, useState } from "react";
import { useUserHook } from "../../hooks/useUserHook";
import axios from "axios";
import { toast } from "react-toastify";
import { setSpinnerState } from "../../Redux/spinnerSlicer";
import { useRefetchHook } from "../../hooks/useFeedRefetch";
import { setFeedRefetch } from "../../Redux/feedRefetchSlicer";

const AddPostPopUp = () => {
  const notify = () =>
    toast.success("Post Added Successfully !", {
      autoClose: 1000,
      theme: "colored",
    });
  const notifyError = () =>
    toast.error("Error", { autoClose: 1000, theme: "colored" });
  const dispatch = useDispatch();
  const { user } = useUserHook();
  const { addPostModalStates } = usePostAddModalHook();
  const { useFeedRefetch } = useRefetchHook()
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
    type: 1,
  });

  // close modal
  const closeDefaultPostAddModal = () => {
    dispatch(
      setAddPostModal({
        defaultPost: false,
        pollPost: false,
        quizPost: false,
        openImageUpload: false,
        showPostButtons: true,
      })
    );
    setUploadedImage('')
    setUploadedVideo('')
    document.body.style.overflow='auto'

  };

  useEffect(() => {
    if (postValue.img?.type.includes("video")) {
      setPostValue({ ...postValue, type: 0 });
      setUploadedImage("");
    }

    if (postValue.img?.type.includes("image")) {
      setPostValue({ ...postValue, type: 1 });
      setUploadedVideo("");
    }
    //eslint-disable-next-line
  }, [postValue.img]);

  useEffect(() => {
    if (addPostModalStates.openImageUpload) {
      fileInputRef.current && fileInputRef.current.click(); //ინპუტზე დაკლიკების იმიტაცია
      dispatch(setAddPostModal({ showPostButtons: true, defaultPost: true }));
    }
    //გახდება ფოლსი ახლიდან დაკლიკება რო შევძლოთ ინფუთზე
  }, [addPostModalStates.openImageUpload]);

  //სურათის ასატვირთი ფუნქცია
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log(file);
    
    if (file) {
      if (file.type.includes("image")) {
        setUploadedImage(URL.createObjectURL(file));
        
      }

      if (file.type.includes("video")) {
        setUploadedVideo(URL.createObjectURL(file));
      }
      dispatch(
        setAddPostModal({
          defaultPost: true,
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
    dispatch(setAddPostModal({ showPostButtons: true, defaultPost: true }));
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset the file input value
    }
  }

  const sendPost = async () => {
    const token = localStorage.getItem("token");
    dispatch(setSpinnerState(true))
    try {
      await axios.post(import.meta.env.VITE_POSTING, postValue, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type":
            "multipart/form-data, application/json, text/plain, */*",
        },
      });
      notify();
      closeDefaultPostAddModal();
      setUploadedImage("");
      setPostValue({
        ...postValue,
        text: "",
        title: "",
        img: undefined,
        type: 1,
      });
      dispatch(setFeedRefetch(!useFeedRefetch))
    } catch (error: unknown) {
      console.error(error)
      notifyError();
    } finally {
      dispatch(setSpinnerState(false))
    }
  };



  useEffect(() => {
    if (postValue.text !== '') {
      // ტექსტარეას სიმაღლის ცლილებაზე გაიზარდოს ტექსტარეაც
      if(textareaRef.current){
        textareaRef.current.style.minHeight = `${textareaRef.current.scrollHeight}px`;
      }
    }

    
  }, [postValue.text]);


  useEffect(()=>{
    if (postValue.text !== '' && postValue.img !== undefined) {
      // ტექსტარეას სიმაღლის ცლილებაზე გაიზარდოს ტექსტარეაც
      if(textareaRef.current){
        textareaRef.current.style.height = "32px"
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
    }

    // თუ ტექსტარეა ცარიელია და სურათი არსებობს მაშინ დაუბრუნდეს საწყის ზომას 
    if(textareaRef.current && postValue.text === '' && postValue.img !== undefined){
      textareaRef.current.style.height = "32px"
    }

    if(textareaRef.current && postValue.text === '' && postValue.img === undefined){
      textareaRef.current.style.height = "120px"
    }

  },[postValue.img, postValue.text])

  return (
    addPostModalStates.defaultPost && (
      <div style={{ width: "100%" }}>
        <BackDrop funcName={closeDefaultPostAddModal} />
        <div className="AddPostPopUp_parent">
        <div className="AddPostPopUp">
          <CreateTitle
            title={"Create Post"}
            funcName={closeDefaultPostAddModal}
          />
          <div className="post_body">
            <PostAuthor />
            <PostTextarea
              postValieProp={postValue.text}
              handleChangeProp={handleChange}
              uploadedImageProp={uploadedImage}
              fileInputRefProp={fileInputRef}
              handleFileChangeProp={handleFileChange}
              uploadedVideoProp={uploadedVideo}
              clearMediaProp={clearMedia} 
              textareaRefProp={textareaRef}            
              />

            {addPostModalStates.showPostButtons && <PostBottomButtons />}
          </div>

          <div className="add_post_popup_btn">
            <LoginModalBtn title={"Post"} btnWidth="480px" funName={sendPost} />
          </div>
        </div>
        </div>
      </div>
    )
  );
};

export default AddPostPopUp;
