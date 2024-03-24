import { logOutIcon } from "../../assets/svg/logOut"
import { moonIcon } from "../../assets/svg/moonIcon"
import UserDashItem from "./UserDashItem"

const UserDash = () => {
  return (
    <div className="user_dash">
        {moonIcon}
        <UserDashItem icon={moonIcon} text="Dark Mode"/>
        <UserDashItem icon={logOutIcon} text="Log Out"/>
    </div>
  )
}

export default UserDash