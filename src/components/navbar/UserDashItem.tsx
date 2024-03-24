import React, { ReactNode } from "react"

interface UserDashItemProps {
    icon: ReactNode;
    text: string;
}

const UserDashItem:React.FC<UserDashItemProps> = ({icon, text}) => {
  return (
    <div className="user_dash_item">
        {icon}
        <p>{text}</p>
    </div>
  )
}

export default UserDashItem