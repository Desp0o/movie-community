import { useSelector } from "react-redux"
import { homeIocn } from "../../assets/svg/homeIcon"
import { privacyIcon } from "../../assets/svg/privacyIcon"
import LeftNavItem from "./LeftNavItem"
import LeftNavSections from "./LeftNavSections"
import "./LeftNavigation.css"
import { useDarkModeHook } from "../../hooks/useDarkModeHook"

interface RootState {
  leftMenuStore:{
    isLeftMenuOpen: boolean;
  }
}

const LeftNavigation = () => {

  const isOpen = useSelector((state: RootState) => state.leftMenuStore.isLeftMenuOpen)
  const { isDark } = useDarkModeHook()

  return (
<div className={isOpen ? (isDark ? 'left_nav active dark' : 'left_nav active') : (isDark ? 'left_nav dark' : 'left_nav')}>
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