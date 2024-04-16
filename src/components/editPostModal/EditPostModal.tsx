import React, { useEffect, useState } from "react";
import SendPostBTN from "../CreatePageComps/SendPostBTN";
import axios from "axios";
import Fetching from "../fetchingComponent/Fetching";
import "./editpost.css"
import "../CreatePageComps/CreatePageStyles.css"
import { useEditPotsModal } from "../../hooks/useEditPotsModal";
import { useDispatch } from "react-redux";
import { setEditPostModal } from "../../Redux/EditPostSlicer";
import { xIcon } from "../../assets/svg/Xicon";
import { useDarkModeHook } from "../../hooks/useDarkModeHook";
import { setRefetch } from "../../Redux/RefetchSlicer";
import { useRefetchHook } from "../../hooks/useRefetchHook";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const EditPost = () => {
    const notify = () => toast.success('Post Edited Successfully !',{ autoClose: 1000, theme: "colored" });
  const notifyError = () => toast.error('Error',{ autoClose: 1000, theme: "colored" });
  const token = localStorage.getItem("token");
  const {isDark} = useDarkModeHook()
  const dispatch = useDispatch()
  const [isLoading, setLoading] = useState(false);
  const {editPostModal} = useEditPotsModal()
  const {requestRefetch} = useRefetchHook()

  const [postValue, setPostValue] = useState<{
    title: string;
    text: string;
  }>({
    title: "",
    text: "",
  });


  const handlePostTitle = (event: { target: { value: string } }) => {
    setPostValue({ ...postValue, title: event.target.value });
  };

  const handlePostBody = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostValue({ ...postValue, text: event.target.value });
  };

  const sendPost = async () => {
    setLoading(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_POST_EDIT}${editPostModal.id}`,
        postValue,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(setRefetch(!requestRefetch))
      dispatch(setEditPostModal({value: false}))
      notify()
      
    } catch (error: any) {
      console.log(error.response.data);
      notifyError()
    } finally {
      setLoading(false);
    }
  };

  const editPost = () => {
    sendPost();
  };

  const closeEditPostModal = () => {
    dispatch(setEditPostModal(false))
  }

  const getPostForEdit = async () => {
    try {
        const response = await axios.get(
          `${import.meta.env.VITE_SINGLE_POST}${editPostModal.id}`
        );
        console.log(response.data);
        

        setPostValue({...postValue, title: response.data[0].title, text:response.data[0].text})
      } catch (error) {
        console.error(error);
      }finally{
        setLoading(false)
      }
  }

  useEffect(()=>{
    if(editPostModal.id){
        getPostForEdit()

    }
},[editPostModal.id])

  return (
    <div>
      <>
        {isLoading ? <Fetching /> : <></>}
        <div className={editPostModal.value ? "edit_post_container active" : "edit_post_container"}>
        <div className={isDark ? "add_post dark" : "add_post"}>
        <span style={{ cursor: "pointer"}} onClick={closeEditPostModal}>
              {xIcon}
            </span>

          <input
            value={postValue.title}
            type="text"
            className="input_style_createPage"
            placeholder="სათაური"
            onChange={handlePostTitle}
          />

          <textarea
            value={postValue.text}
            className="post_body"
            onChange={handlePostBody}
          />
          <SendPostBTN funName={editPost} />
        </div>
        </div>
      </>
    </div>
  );
};

export default EditPost;
