import React from "react";
import { ErrorIcon } from "../../assets/svg/errorIcon";

interface RegErrMsgProps {
    message: string;
}

export const RegErrMsg:React.FC<RegErrMsgProps> = ({message}) => {
  return (
    <div className="reg_err_msg_container">
      {ErrorIcon}
      <p className="reg_err_message">{message}</p>
    </div>
  );
};
