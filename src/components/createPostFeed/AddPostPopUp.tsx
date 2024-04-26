import CreateTitle from "./addPostComps/CreateTitle"
import PostAuthor from "./addPostComps/PostAuthor"
import PostTextarea from "./addPostComps/PostTextarea"

const AddPostPopUp = () => {
  return (
    <div className="AddPostPopUp">
        <CreateTitle title={"Create Post"} />
        <div className="post_body">

            <PostAuthor />

            <PostTextarea />

            
        </div>
    </div>
  )
}

export default AddPostPopUp