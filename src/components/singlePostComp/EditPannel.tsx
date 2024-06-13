import React, { useEffect, useRef, useState } from 'react'
import { canIcon } from '../../assets/svg/canIcon'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { penIcon } from '../../assets/svg/penIcon';
import { setSpinnerState } from '../../Redux/spinnerSlicer';
import PostEditPopUp from '../createPostFeed/PostEditPopUp';
import { setFeedRefetch } from '../../Redux/feedRefetchSlicer';
import { useRefetchHook } from '../../hooks/useFeedRefetch';

interface EditPannelPros{
    postID: string | number;
    isInnerPage?: boolean;
    type: number | string;
}

const EditPannel:React.FC<EditPannelPros> = ({postID,isInnerPage, type}) => {
    const notify = () => toast.success('Post deleted Successfully !',{ autoClose: 1000, theme: "colored" });
    const notifyError = () => toast.error('Error',{ autoClose: 1000, theme: "colored" });
    const token = localStorage.getItem('token')
    const [isActive, setActive] = useState(false)
    const { useFeedRefetch } = useRefetchHook()
    const [openEditModal, setOpenEditModal] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const editPanelRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            if (
                editPanelRef.current &&
                event.target instanceof Node &&
                !editPanelRef.current.contains(event.target)
            ) {
                setActive(false);
            }
        };
    
        document.addEventListener("click", handleClick);
    
        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, [isActive]);

    const handlePannel = () => {
        setActive(!isActive)
    }


    const deletePost = async () => {
      dispatch(setSpinnerState(true))
        try {
           await axios.get(`${import.meta.env.VITE_POST_DELETE}${postID}`,
            {
              headers:{
                Authorization: `Bearer ${token}`
              }
            }
          )
          
          notify()
          if(isInnerPage){
            navigate('/')
          }
          dispatch(setFeedRefetch(!useFeedRefetch))
        } catch (error) {
          console.error(error);
          notifyError()
        }finally{
          dispatch(setSpinnerState(false))
        }
    }

    

    const openEditPostModal = () => {
      setOpenEditModal(true)
    }

    //prop function for edit modal close
    const closeEditPostModal = () => {
      setOpenEditModal(false)
    }

  return (
    <>
    {openEditModal && 
      <PostEditPopUp 
        postID={postID}
        closeEditPostModal={closeEditPostModal}
      />
    }
    <div ref={editPanelRef}>
        <div className='pannel_dots' onClick={handlePannel}>
          <span className='panel_single_dot' />
          <span className='panel_single_dot' />
          <span className='panel_single_dot' />
        </div>

        {
            isActive 
            ?
            <div className="post_setting_pannel">
              <div onClick={deletePost} className='post_delete'>
                <span style={{width:"20px", height:"20px"}}>{canIcon}</span>
                 Delete
                 </div>

                 {
                  type !==4 &&
                  <div onClick={openEditPostModal} className='edit_delete'>
                <span style={{width:"20px", height:"20px"}}>{penIcon}</span>
                 Edit post
                 </div>
                }
            </div>
            :
            <></>
        }
    </div>
    </>
  )
}

export default EditPannel