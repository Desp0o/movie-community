import React, { useEffect, useRef, useState } from 'react'
import { useDarkModeHook } from '../../hooks/useDarkModeHook'
import { canIcon } from '../../assets/svg/canIcon'
import axios from 'axios';
import { setRefetch } from '../../Redux/RefetchSlicer';
import { useDispatch } from 'react-redux';
import { useRefetchHook } from '../../hooks/useRefetchHook';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { penIcon } from '../../assets/svg/penIcon';

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

  return (
    <div ref={editPanelRef}>
        <p className='pannel_dots' onClick={handlePannel}>. . .</p>

        {
            isActive 
            ?
            <div className={isDark ? "post_setting_pannel dark" : "post_setting_pannel"}>
              <div onClick={deletePost} className='post_delete'>
                <span style={{width:"20px", height:"20px"}}>{canIcon}</span>
                 Delete
                 </div>

                 <div onClick={deletePost} className='edit_delete'>
                <span style={{width:"20px", height:"20px"}}>{penIcon}</span>
                 Edit post
                 </div>
            </div>
            :
            <></>
        }
    </div>
  )
}

export default EditPannel

