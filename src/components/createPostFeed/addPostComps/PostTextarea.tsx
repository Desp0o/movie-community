import { useEffect, useRef, useState } from "react";
import { smileIcon } from "../../../assets/svg/smileIcon"
import { useUserHook } from "../../../hooks/useUserHook";
import { usePostAddModalHook } from "../../../hooks/usePostAddModalHook";
import { useDispatch } from "react-redux";
import { setAddPostModal } from "../../../Redux/postModal";

const PostTextarea = () => {
  const dispatch = useDispatch()
  const { user } = useUserHook()
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
    }
    dispatch(setAddPostModal({defaultPost: true, pollPost: false, showPostButtons: true})) //გახდება ფოლსი ახლიდან დაკლიკება რო შევძლოთ ინფუთზე
  },[addPostModalStates.openImageUpload])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedImage(URL.createObjectURL(file));
      dispatch(setAddPostModal({defaultPost: true, pollPost: false, showPostButtons: false})) 
    }

    setPostValue({ ...postValue, img: file });
  };

  return (
    <div className="post_txtarea_smile">
        <textarea className="popup_textarea" placeholder="Write post..." />
        <span>{smileIcon}</span>

        {
          uploadedImage && 
          <div className="uploaded_image_addPost_container">
            <img src={uploadedImage} alt="uploaded post img" className="uploaded_image_addPost" />
          </div>
        }

        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
    </div>
  )
}

export default PostTextarea