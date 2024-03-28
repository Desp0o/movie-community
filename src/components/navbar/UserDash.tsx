import { logOutIcon } from "../../assets/svg/logOut"
import { moonIcon } from "../../assets/svg/moonIcon"
import UserDashItem from "./UserDashItem"
import { useDispatch } from "react-redux"
import { setDarkBG } from "../../Redux/DarkModeSlicer"
import { useDarkModeHook } from "../../hooks/useDarkModeHook"
import { profileIcon } from "../../assets/svg/profileIcon"
import { useLogOut } from "../../hooks/useLogOut"
import { setDashVisible } from "../../Redux/userDahsSlicer"

const UserDash = () => {
    const { isDark } = useDarkModeHook()
    const { handleLogout } = useLogOut()
    const dispatch = useDispatch()

    const toggleHandler = () => {
        dispatch(setDarkBG(!isDark))
    }

    const toggler = () => {
        return  <div className={isDark ? "toggler active" : "toggler"} onClick={toggleHandler}>
                    <div className={isDark ? "toggler_thub active" : "toggler_thub"}/>
                </div>
    }


  const modalCloser = () => {
   setTimeout(()=>{
      dispatch(setDashVisible(false))
    },0)
  }

  return (
    <div className="user_dash">
        <UserDashItem icon={profileIcon} text="Profile" closer={modalCloser}/>
        <UserDashItem icon={moonIcon} text="Dark Mode" toggler={toggler} />
        <UserDashItem icon={logOutIcon} text="Log Out" funName={handleLogout} closer={modalCloser}/>
    </div>
  )
}

export default UserDash