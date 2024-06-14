import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { setSpinnerState } from '../../Redux/spinnerSlicer';
import PostEditPopUp from '../createPostFeed/PostEditPopUp';
import { setFeedRefetch } from '../../Redux/feedRefetchSlicer';
import { useRefetchHook } from '../../hooks/useFeedRefetch';
import "../../pages/CreateQuiz.css"
import { closeSquareIcon } from '../../assets/newSvg/closeSquareIcon';

interface EditPannelPros {
  postID: string | number;
  isInnerPage?: boolean;
  type: number | string;
}

const EditPannel: React.FC<EditPannelPros> = ({ postID, isInnerPage, type }) => {
  const notify = () => toast.success('Post deleted Successfully !', { autoClose: 1000, theme: "colored" });
  const notifyError = () => toast.error('Error', { autoClose: 1000, theme: "colored" });
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
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      notify()
      if (isInnerPage) {
        navigate('/')
      }
      dispatch(setFeedRefetch(!useFeedRefetch))
    } catch (error) {
      console.error(error);
      notifyError()
    } finally {
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
            <div className="cr_quiz_card_editPanel">

              <span onClick={() => setActive(false)}>{closeSquareIcon}</span>

              {type === 0 || type === 1 && <p className='cr_quiz_card_editPanel_p' onClick={openEditPostModal}>edit post</p>}
              <p className='cr_quiz_card_editPanel_p' onClick={deletePost}>delete post</p>
            </div>
            :
            <></>
        }
      </div>
    </>
  )
}

export default EditPannel