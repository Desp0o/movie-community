import BackDrop from "../backDrop/BackDrop"
import LoginModalBtn from "../login/LoginModalBtn"
import CreateTitle from "./addPostComps/CreateTitle"
import PostAuthor from "./addPostComps/PostAuthor"
import PostBottomButtons from "./addPostComps/PostBottomButtons"
import PostTextarea from "./addPostComps/PostTextarea"

const AddPostPopUp = () => {
  return (
    <div>
      <BackDrop funcName={function (): void {
        throw new Error("Function not implemented.")
      } } />
      <div className="AddPostPopUp">
          <CreateTitle title={"Create Post"} />
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