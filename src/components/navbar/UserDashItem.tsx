import React, { ReactNode } from "react"

interface UserDashItemProps {
    icon: ReactNode;
    text: string;
    toggler?: () => JSX.Element | null;
}

const UserDashItem:React.FC<UserDashItemProps> = ({icon, text, toggler}) => {
  return (
    <div className="user_dash_item">
        {icon}
        <p>{text}</p>

{toggler && toggler()}
    </div>
  )
}

export default UserDashItem