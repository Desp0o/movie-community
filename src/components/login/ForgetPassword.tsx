import { useState } from "react";
import InputComponent from "../inputComponent/InputComponent";
import LoginModalBtn from "./LoginModalBtn";

const ForgetPassword = () => {
  const [emailInput, setEmailInput] = useState("");
  const pwdRecovery = async () => {
    try {
    } catch (error) {}
  };
  return (
    <div className="container_forget_pwd">
      <form className="forget_password_form_inner" onSubmit={pwdRecovery}>
        <p className="forg_pwd_title">A link will be sent to your Email address to reset your password</p>
        <div className="forg_pwd_input_btn">
          <InputComponent
            type="mail"
            autoComplete="email"
            placeholder={"Email"}
            value={emailInput}
            isError={false}
            onChange={(e) => setEmailInput(e.target.value)} 
            nameProp={"email"}          
            />
          <LoginModalBtn title="Send" funName={pwdRecovery} />
        </div>
      </form>
    </div>
  );
};

export default ForgetPassword;
