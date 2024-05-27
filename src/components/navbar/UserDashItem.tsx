import React, { ReactNode } from "react";
import { Link } from "react-router-dom";

interface UserDashItemProps {
  icon: ReactNode;
  text: string;
  toggler?: () => JSX.Element | null;
  funName?: () => void;
  closer?: () => void;
  pathName?: string
}

const UserDashItem: React.FC<UserDashItemProps> = ({pathName, icon, text, toggler, funName, closer }) => {

  return (
    pathName ? 
    <Link to={pathName}>
    <div className="user_dash_item" onClick={() => { closer && closer(); funName && funName(); }}>
      {icon}
      <p>{text}</p>

      <div className="toggler_parent">
        {toggler && toggler()}
      </div>
    </div>
    </Link>
    :
    <div className="user_dash_item" onClick={() => { closer && closer(); funName && funName(); }}>
      {icon}
      <p>{text}</p>

      <div className="toggler_parent">
        {toggler && toggler()}
      </div>
    </div>
  
    
  );
};

export default UserDashItem;
