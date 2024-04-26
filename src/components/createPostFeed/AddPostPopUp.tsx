import { useDispatch } from "react-redux"
import BackDrop from "../backDrop/BackDrop"
import LoginModalBtn from "../login/LoginModalBtn"
import CreateTitle from "./addPostComps/CreateTitle"
import PostAuthor from "./addPostComps/PostAuthor"
import PostBottomButtons from "./addPostComps/PostBottomButtons"
import PostTextarea from "./addPostComps/PostTextarea"
import { setAddPostModal } from "../../Redux/postModal"
import { usePostAddModalHook } from "../../hooks/usePostAddModalHook"
import { useEffect, useRef, useState } from "react"
import { useUserHook } from "../../hooks/useUserHook"
import axios from "axios"
import { setRefetch } from "../../Redux/RefetchSlicer"
import { useRefetchHook } from "../../hooks/useRefetchHook"
import { toast } from "react-toastify"

const AddPostPopUp = () => {
  const notify = () => toast.success('Post Added Successfully !',{ autoClose: 1000, theme: "colored" });
  const notifyError = () => toast.error('Error',{ autoClose: 1000, theme: "colored" });
  const dispatch = useDispatch()
  const { user } = useUserHook()
  const { requestRefetch } = useRefetchHook()
  const { addPostModalStates } = usePostAddModalHook()
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


  

  // close modal
  const closeDefaultPostAddModal = () => {
    dispatch(setAddPostModal({defaultPost: false, pollPost: false, quizPost: false, openImageUpload: false, showPostButtons: true}))
    console.log(1);
    
  }

  useEffect(()=>{

    if(postValue.img?.type.includes('video')){
      setPostValue({ ...postValue, type: 1 });
    }

    if(postValue.img?.type.includes('image')){
      setPostValue({ ...postValue, type: 0 });
    }
    //eslint-disable-next-line
  },[postValue.img])

  useEffect(()=>{
    if(addPostModalStates.openImageUpload){
      fileInputRef.current && fileInputRef.current.click(); //ინპუტზე დაკლიკების იმიტაცია
      dispatch(setAddPostModal({showPostButtons: true, defaultPost: true}))
    }
     //გახდება ფოლსი ახლიდან დაკლიკება რო შევძლოთ ინფუთზე
  },[addPostModalStates.openImageUpload])

  //სურათის ასატვირთი ფუნქცია
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedImage(URL.createObjectURL(file)); //create image adress
      dispatch(setAddPostModal({defaultPost: true, pollPost: false, showPostButtons: false})) 
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
    event.target.style.height = "120px";
    event.target.style.height = `${event.target.scrollHeight}px`;
    setPostValue({...postValue, title: event.target.value})
  };

  const sendPost = async () => {   
    const token = localStorage.getItem('token')
      try {
          await axios.post(import.meta.env.VITE_POSTING , postValue, {
            headers: {
              Authorization:`Bearer ${token}`,
              'Content-Type': 'multipart/form-data, application/json, text/plain, */*'
            }
          })
          notify()
          closeDefaultPostAddModal()
          dispatch(setRefetch(!requestRefetch))
          setUploadedImage('')
          setPostValue({...postValue, text:'', title:'', img: undefined, type: 0})
        } catch (error: unknown) {
          notifyError()
        }finally{
      }
  }

  return (
    
    addPostModalStates.defaultPost &&
      <div style={{width:"100%"}}>
        <BackDrop funcName={closeDefaultPostAddModal} />
        <div className="AddPostPopUp">
            <CreateTitle title={"Create Post"} funcName={closeDefaultPostAddModal}/>
            <div className="post_body">
                <PostAuthor />
                <PostTextarea 
                  postValieProp={postValue.title} 
                  handleChangeProp={handleChange} 
                  uploadedImageProp={uploadedImage} 
                  fileInputRefProp={fileInputRef} 
                  handleFileChangeProp={handleFileChange} />
                {addPostModalStates.showPostButtons && <PostBottomButtons /> }
            </div>

            <div className="add_post_popup_btn">
              <LoginModalBtn 
                title={"Post"} 
                btnWidth="480px" 
                funName={sendPost} 
              />
            </div>
        </div>
      </div>
  )
}

export default AddPostPopUp