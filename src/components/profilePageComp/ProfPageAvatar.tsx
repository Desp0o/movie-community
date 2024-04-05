import "./profile.css"
import { useUserHook } from '../../hooks/useUserHook'
import { useDarkModeHook } from "../../hooks/useDarkModeHook"

const ProfPageAvatar = () => {

    const { user } = useUserHook()
    const { isDark } = useDarkModeHook()

  return (
    <div className="profile_page_avatar_block">
        <div className={isDark ? "profile_page_avatar_parent dark" : 'profile_page_avatar_parent'}>
            <img src={user.avatar} alt='profile page avatar' className='profile_page_avatar' />
        </div>
        <p className="profile_page_name">{user.name}</p>    
    </div>
  )
}

export default ProfPageAvatar