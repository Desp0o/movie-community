import { smileIcon } from "../../../assets/svg/smileIcon"

const PostTextarea = () => {
  return (
    <div className="post_txtarea_smile">
        <textarea className="popup_textarea" placeholder="Write post..." />

        <span>{smileIcon}</span>
    </div>
  )
}

export default PostTextarea