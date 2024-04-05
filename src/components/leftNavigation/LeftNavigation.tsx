import { useDispatch, useSelector } from "react-redux"
import { homeIocn } from "../../assets/svg/homeIcon"
import { privacyIcon } from "../../assets/svg/privacyIcon"
import LeftNavItem from "./LeftNavItem"
import LeftNavSections from "./LeftNavSections"
import "./LeftNavigation.css"
import { useDarkModeHook } from "../../hooks/useDarkModeHook"
import { setLeftMenuState } from "../../Redux/leftMenuSlicer"

interface RootState {
  leftMenuStore:{
    isLeftMenuOpen: boolean;
  }
}

const LeftNavigation = () => {

  const isOpen = useSelector((state: RootState) => state.leftMenuStore.isLeftMenuOpen)
  const { isDark } = useDarkModeHook()
  const dispatch = useDispatch()

  const backdropClickHandler = () => {
    dispatch(setLeftMenuState(false))
  }

  return (
    <>
      <div className={isOpen ? 'lef_menu_backdrop active' : 'lef_menu_backdrop'} 
        onClick={backdropClickHandler}
      />

      <div className={isOpen ? (isDark ? 'left_nav active dark' : 'left_nav active') : (isDark ? 'left_nav dark' : 'left_nav')}>
        <LeftNavSections>
            <LeftNavItem title="Home" icon={homeIocn} path="/"/>
        </LeftNavSections>

        <LeftNavSections>
            <LeftNavItem title="Privacy Policy" icon={privacyIcon} path="/pages/privacy"/>
        </LeftNavSections>  
      </div>
    </>
  )
}

export default LeftNavigation