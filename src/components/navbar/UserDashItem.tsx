import React, { ReactNode } from "react";
import { useDarkModeHook } from "../../hooks/useDarkModeHook";

interface UserDashItemProps {
  icon: ReactNode;
  text: string;
  toggler?: () => JSX.Element | null;
  funName?: () => void;
  closer?: () => void;
}

const UserDashItem: React.FC<UserDashItemProps> = ({ icon, text, toggler, funName, closer }) => {
  const { isDark } = useDarkModeHook()

  return (
    <div className={isDark ? "user_dash_item dark" : "user_dash_item"} onClick={() => { closer && closer(); funName && funName(); }}>
      {icon}
      <p>{text}</p>

      <div className="toggler_parent">
        {toggler && toggler()}
      </div>
    </div>
  );
};

export default UserDashItem;
