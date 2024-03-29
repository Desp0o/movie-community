import React, { ReactNode } from "react";
import { useDarkModeHook } from "../../hooks/useDarkModeHook";
import { Link } from "react-router-dom";

interface leftNavItemProps {
  icon: ReactNode;
  title: string;
  path: string;
}

const LeftNavItem: React.FC<leftNavItemProps> = ({ icon, title, path }) => {
  const { isDark } = useDarkModeHook();

  return (
    <Link to={path}>
      <div className={isDark ? "left_nav_item dark" : "left_nav_item"}>
        <span className="left_nav_item_icon">{icon}</span>
        <p>{title}</p>
      </div>
    </Link>
  );
};

export default LeftNavItem;
