import { logOutIcon } from "../../assets/svg/logOut"
import { moonIcon } from "../../assets/svg/moonIcon"
import UserDashItem from "./UserDashItem"
import { useDispatch } from "react-redux"
import { setDarkBG } from "../../Redux/DarkModeSlicer"
import { useDarkModeHook } from "../../hooks/useDarkModeHook"

const UserDash = () => {
    const { isDark } = useDarkModeHook()
    const dispatch = useDispatch()

    const toggleHandler = () => {
        dispatch(setDarkBG(!isDark))
    }

    const toggler = () => {
        return  <div className={isDark ? "toggler active" : "toggler"} onClick={toggleHandler}>
                    <div className={isDark ? "toggler_thub active" : "toggler_thub"}/>
                </div>
    }

  return (
    <div className="user_dash">
        <UserDashItem icon={moonIcon} text="Dark Mode" toggler={toggler}/>
        <UserDashItem icon={logOutIcon} text="Log Out"/>
    </div>
  )
}

export default UserDash