import "./profile.css"
import { useUserHook } from '../../hooks/useUserHook'
import noAvatar from "../../assets/noAvatar.jpeg"

const ProfPageAvatar = () => {

    const { user } = useUserHook()

  return (
    <div className="profile_page_avatar_block">
        <div className="profile_page_avatar_parent">
            <img src={user.avatar ? user.avatar : noAvatar} alt='profile page avatar' className='profile_page_avatar' />
        </div>
        <p className="profile_page_name">{user.name}</p>    
    </div>
  )
}

export default ProfPageAvatar