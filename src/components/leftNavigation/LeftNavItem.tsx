import React, { ReactNode } from "react";
import { useDarkModeHook } from "../../hooks/useDarkModeHook";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLeftMenuState } from "../../Redux/leftMenuSlicer";

interface leftNavItemProps {
  icon: ReactNode;
  title: string;
  path: string;
}

interface RootState {
  leftMenuStore:{
    isLeftMenuOpen: boolean
  }
}

const LeftNavItem: React.FC<leftNavItemProps> = ({ icon, title, path }) => {
  const { isDark } = useDarkModeHook();
  const isLeftMenuOpen = useSelector((state:RootState) => state.leftMenuStore.isLeftMenuOpen)
  const dispatch = useDispatch()

  const closeNavOnItemClick = () => {
    if(isLeftMenuOpen){
      dispatch(setLeftMenuState(false))
    }
  }

  return (
    <Link to={path} onClick={closeNavOnItemClick}>
      <div className={isDark ? "left_nav_item dark" : "left_nav_item"}>
        <div className="left_nav_item_icon">{icon}</div>
        <p>{title}</p>
      </div>
    </Link>
  );
};

export default LeftNavItem;
