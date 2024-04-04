import { useSelector } from "react-redux"
import { homeIocn } from "../../assets/svg/homeIcon"
import { privacyIcon } from "../../assets/svg/privacyIcon"
import LeftNavItem from "./LeftNavItem"
import LeftNavSections from "./LeftNavSections"
import "./LeftNavigation.css"

interface RootState {
  leftMenuStore:{
    isLeftMenuOpen: boolean;
  }
}

const LeftNavigation = () => {

  const isOpen = useSelector((state: RootState) => state.leftMenuStore.isLeftMenuOpen)

  return (
    <div className={isOpen ? 'left_nav active' : 'left_nav'}>
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