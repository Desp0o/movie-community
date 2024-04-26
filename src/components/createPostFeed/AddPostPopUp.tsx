import { useDispatch } from "react-redux"
import BackDrop from "../backDrop/BackDrop"
import LoginModalBtn from "../login/LoginModalBtn"
import CreateTitle from "./addPostComps/CreateTitle"
import PostAuthor from "./addPostComps/PostAuthor"
import PostBottomButtons from "./addPostComps/PostBottomButtons"
import PostTextarea from "./addPostComps/PostTextarea"
import { setAddPostModal } from "../../Redux/postModal"
import { usePostAddModalHook } from "../../hooks/usePostAddModalHook"

const AddPostPopUp = () => {
  const dispatch = useDispatch()
  const { addPostModalStates } = usePostAddModalHook()


  const closeDefaultPostAddModal = () => {
    dispatch(setAddPostModal({defaultPost: false, pollPost: false, quizPost: false, openImageUpload: false}))
  }

  

  return (
    
    addPostModalStates.defaultPost &&
      <div style={{width:"100%"}}>
        <BackDrop funcName={closeDefaultPostAddModal} />
        <div className="AddPostPopUp">
            <CreateTitle title={"Create Post"} funcName={closeDefaultPostAddModal}/>
            <div className="post_body">
                <PostAuthor />
                <PostTextarea />
                <PostBottomButtons />
            </div>

            <div className="add_post_popup_btn">
              <LoginModalBtn 
                title={"Post"} 
                btnWidth="480px" 
                funName={()=>{}} 
              />
            </div>
        </div>
      </div>
  )
}

export default AddPostPopUp