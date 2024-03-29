import { homeIocn } from "../../assets/svg/homeIcon"
import LeftNavItem from "./LeftNavItem"
import LeftNavSections from "./LeftNavSections"
import "./LeftNavigation.css"

const LeftNavigation = () => {
  return (
    <div className="left_nav">
        <LeftNavSections>
            <LeftNavItem title="Home" icon={homeIocn}/>
        </LeftNavSections>
        
    </div>
  )
}

export default LeftNavigation