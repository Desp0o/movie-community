import { homeIocn } from "../../assets/svg/homeIcon"
import { privacyIcon } from "../../assets/svg/privacyIcon"
import LeftNavItem from "./LeftNavItem"
import LeftNavSections from "./LeftNavSections"
import "./LeftNavigation.css"

const LeftNavigation = () => {
  return (
    <div className="left_nav">
        <LeftNavSections>
            <LeftNavItem title="Home" icon={homeIocn} path="/"/>
        </LeftNavSections>

        <LeftNavSections>
            <LeftNavItem title="Privacy Policy" icon={privacyIcon} path="/pages/privacy"/>
        </LeftNavSections>
        
    </div>
  )
}

export default LeftNavigation