import { useUserHook } from "../../../hooks/useUserHook";

const PostAuthor = () => {
  const { user } = useUserHook();
  return (
    <div className="popup_author">
      <img src={user.avatar} alt="user avatr" className="popUp_avatar" />
      <p>{user.name}</p>
    </div>
  );
};

export default PostAuthor;
