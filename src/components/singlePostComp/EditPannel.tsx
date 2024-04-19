import React, { useEffect, useRef, useState } from 'react'
import { useDarkModeHook } from '../../hooks/useDarkModeHook'
import { penIcon } from '../../assets/svg/penIcon'
import { canIcon } from '../../assets/svg/canIcon'
import axios from 'axios';
import { setRefetch } from '../../Redux/RefetchSlicer';
import { useDispatch } from 'react-redux';
import { useRefetchHook } from '../../hooks/useRefetchHook';
import { toast } from 'react-toastify';
import { setEditPostModal } from '../../Redux/EditPostSlicer';
import { useNavigate } from 'react-router-dom';

interface EditPannelPros{
    postID: string | number;
    isInnerPage?: boolean;
}

const EditPannel:React.FC<EditPannelPros> = ({postID,isInnerPage}) => {
    const notify = () => toast.success('Post deleted Successfully !',{ autoClose: 1000, theme: "colored" });
    const notifyError = () => toast.error('Error',{ autoClose: 1000, theme: "colored" });
    const token = localStorage.getItem('token')
    const {isDark} = useDarkModeHook()
    const {requestRefetch} = useRefetchHook()
    const [isActive, setActive] = useState(false)
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
        try {
          const response = await axios.get(`${import.meta.env.VITE_POST_DELETE}${postID}`,
            {
              headers:{
                Authorization: `Bearer ${token}`
              }
            }
          )
          
          console.log(response);
          notify()
          dispatch(setRefetch(!requestRefetch))
          if(isInnerPage){
            navigate('/')
          }
        } catch (error) {
          console.error(error);
          notifyError()
        }
    }

    const editPost = () => {
        dispatch(setEditPostModal({value: true, id: postID}))
      }


  return (
    <div ref={editPanelRef}>
        <p className='pannel_dots' onClick={handlePannel}>. . .</p>

        {
            isActive 
            ?
            <div className={isDark ? "post_setting_pannel dark" : "post_setting_pannel"}>
            <div onClick={editPost} style={{display:"flex", alignItems:"center", gap:"5px", fontSize:"14px",cursor:"pointer"}}>{penIcon} Edit</div>
            <div onClick={deletePost} style={{display:"flex", alignItems:"center", gap:"5px", fontSize:"14px",cursor:"pointer"}}>{canIcon} Delete</div>
            </div>
            :
            <></>
        }
    </div>
  )
}

export default EditPannel

