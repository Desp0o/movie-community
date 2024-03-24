import { useState } from "react"
import { logOutIcon } from "../../assets/svg/logOut"
import { moonIcon } from "../../assets/svg/moonIcon"
import UserDashItem from "./UserDashItem"
import { useDispatch } from "react-redux"
import { setDarkBG } from "../../Redux/DarkModeSlicer"

const UserDash = () => {
    const [isDarkMode, setDarkMode] = useState(false)

    const dispatch = useDispatch()

    const toggleHandler = () => {
        setDarkMode(!isDarkMode)
        dispatch(setDarkBG(!isDarkMode))
    }

    const toggler = () => {
        return <div className="toggler" onClick={toggleHandler}>
            <div className={isDarkMode ? "toggler_thub active" : "toggler_thub"}/>
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