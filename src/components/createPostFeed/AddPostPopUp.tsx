import CreateTitle from "./addPostComps/CreateTitle"
import PostAuthor from "./addPostComps/PostAuthor"
import PostBottomButtons from "./addPostComps/PostBottomButtons"
import PostTextarea from "./addPostComps/PostTextarea"

const AddPostPopUp = () => {
  return (
    <div className="AddPostPopUp">
        <CreateTitle title={"Create Post"} />
        <div className="post_body">

            <PostAuthor />

            <PostTextarea />

            <PostBottomButtons />
        </div>
    </div>
  )
}

export default AddPostPopUp