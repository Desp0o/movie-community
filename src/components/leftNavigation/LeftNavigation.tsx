import { homeIocn } from "../../assets/svg/homeIcon"
import LeftNavItem from "./LeftNavItem"
import "./LeftNavigation.css"

const LeftNavigation = () => {
  return (
    <div className="left_nav">
        <LeftNavItem title="Home" icon={homeIocn}/>
    </div>
  )
}

export default LeftNavigation