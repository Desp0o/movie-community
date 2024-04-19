import { useDispatch } from "react-redux";
import { xIcon } from "../../assets/svg/Xicon";
import { useDarkModeHook } from "../../hooks/useDarkModeHook";
import { useGoogleLogIn } from "../../hooks/useGoogleAuth";
import "./login.css";
import { setModalVisible } from "../../Redux/loginModalSlicer";
import { useState } from "react";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import { useLoginModal } from "../../hooks/useLoginModal";


const Login = () => {
  const dispatch = useDispatch();
  const {isModalVisible} = useLoginModal()
  const { isDark } = useDarkModeHook();
  const [regForm, setRegForm] = useState(false);
  const [loginForm, setLoginForm] = useState(false);

  const modalCloser = () => {
    dispatch(setModalVisible(false));
  };

  const register = () => {
    setRegForm(true);
    setLoginForm(false);
  };

  const login = () => {
    setRegForm(false);
    setLoginForm(true);
  };

  const closeLoginRegWindows = () => {
    setRegForm(false);
    setLoginForm(false);
  }


  const [loginMode, setLoginMode] = useState(true)
  const [regMode, setRegMode] = useState(false)

  const loginModeHandler = () => {
    setLoginMode(true)
    setRegMode(false)
  }

  const regModeHandler = () => {
    setLoginMode(false)
    setRegMode(true)
  }

  return (
    isModalVisible 
    ? 
    <div className="login_Container">
      <div className="login_backdrop" onClick={modalCloser} />
      <div className="logind_modal">
        <div className="login_modal_inner">

          <div className="log_modal_title_mode">

            <div className="title_close_icon">
              <p className="login_title">Authorization</p>
              <span className="button" onClick={modalCloser}>{xIcon}</span>
            </div>

            <div className="login_modal_modes">
              <p className={loginMode ? "mode_btn active" : 'mode_btn'} onClick={loginModeHandler}>Sign In</p>
              <p className={regMode ? "mode_btn active" : 'mode_btn'} onClick={regModeHandler}>Sign In</p>
            </div>

            {loginMode && <LoginForm />}
            {regMode && <RegisterForm />}
          
          </div>
        </div>
      </div>
    </div>
    : <></>
  );
};

export default Login;
