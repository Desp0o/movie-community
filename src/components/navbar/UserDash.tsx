import { logOutIcon } from "../../assets/svg/logOut"
import { moonIcon } from "../../assets/svg/moonIcon"
import UserDashItem from "./UserDashItem"
import { useDispatch } from "react-redux"
import { profileIcon } from "../../assets/svg/profileIcon"
import { useLogOut } from "../../hooks/useLogOut"
import { setDashVisible } from "../../Redux/userDahsSlicer"

const UserDash = () => {
  const { handleLogout } = useLogOut()
  const dispatch = useDispatch()


  const toggler = () => {
    return <div className="toggler active">
      <div className="toggler_thub" />
    </div>
  }


  const modalCloser = () => {
    setTimeout(() => {
      dispatch(setDashVisible(false))
    }, 0)
  }

  return (
    <div className="user_dash">
      <UserDashItem icon={profileIcon} text="Profile" pathName="/pages/Profile" closer={modalCloser} />
      <UserDashItem icon={moonIcon} text="Dark Mode" toggler={toggler} />
      <UserDashItem icon={logOutIcon} text="Log Out" funName={handleLogout} closer={modalCloser} />
    </div>
  )
}

export default UserDash