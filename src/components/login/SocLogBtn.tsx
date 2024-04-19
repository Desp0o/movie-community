import React, { ReactNode } from 'react'

interface SocLogPrps{
    socialName: string;
    icon: ReactNode;
    funcName: () => void
}

const SocLogBtn:React.FC<SocLogPrps> = ({socialName, icon, funcName}) => {
  return (
    <div>
        <div className="social_login_btn" onClick={funcName}>
            {icon}
            <p>{socialName}</p>
          </div>
    </div>
  )
}

export default SocLogBtn