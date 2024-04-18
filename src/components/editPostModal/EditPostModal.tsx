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
      setPostValue({...postValue, text:"", title:""})
    } catch (error: unknown) {
      console.error(error);
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
    setPostValue({...postValue, text: "", title: ""})
  }

  const getPostForEdit = async () => {
    setLoading(true)
    try {
        const response = await axios.get(
          `${import.meta.env.VITE_SINGLE_POST}${editPostModal.id}`
        );
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
    // eslint-disable-next-line
},[editPostModal.id])

useEffect(()=>{
  if (editPostModal.value === true) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  return () => {
    document.body.style.overflow = "auto";
  };
},[editPostModal])

  return (
    <div>
      <>
        {isLoading ? <Fetching /> : <></>}
        <div className={editPostModal.value ? "edit_post_container active" : "edit_post_container"}>
        <div className={isDark ? "edit_post dark" : "add_post"}>
        <div className="close_add">
          <span style={{ cursor: "pointer" }} onClick={closeEditPostModal}>
            {xIcon}
          </span>
          {
          window.innerWidth < 601 ? <div className="res_add_btn res_edit_btn" onClick={editPost}>
            <p>Edit</p>
          </div>
          :
          <></>
          }
        </div>

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
          {window.innerWidth > 600 ? <SendPostBTN funName={editPost} /> : <></>}
        </div>
        </div>
      </>
    </div>
  );
};

export default EditPost;
