import "./profile.css"
import { useUserHook } from '../../hooks/useUserHook'
import { noAvatar } from "../../assets/newSvg/noAvatar"

const ProfPageAvatar = () => {

    const { user } = useUserHook()

  return (
    <div className="profile_page_avatar_block">
        <div className="profile_page_avatar_parent">
            {user.avatar ?  <img src={user.avatar} alt='profile page avatar' className='profile_page_avatar' /> : noAvatar}
        </div>
        <p className="profile_page_name">{user.name}</p>    
    </div>
  )
}

export default ProfPageAvatar