import { useDispatch } from "react-redux";
import { xIcon } from "../../assets/svg/Xicon";
import { googleAuthIcon } from "../../assets/svg/google";
import { useDarkModeHook } from "../../hooks/useDarkModeHook";
import { useGoogleLogIn } from "../../hooks/useGoogleAuth";
import "./login.css";
import { setModalVisible } from "../../Redux/loginModalSlicer";
import { emailIcon } from "../../assets/svg/emailIcon";
import { useState } from "react";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";

const Login = () => {
  const dispatch = useDispatch();
  const { googleLogIn } = useGoogleLogIn();
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

  return (
    <>
      <div className="login_backdrop" onClick={modalCloser} />
      <div className={isDark ? "login_modal dark" : "login_modal"}>
        <div
          className={isDark ? "x_icon_login_modal dark" : "x_icon_login_modal"}
          onClick={modalCloser}
        >
          {xIcon}
        </div>

        {loginForm ? (
          <>
            <LoginForm />
            <p style={{ marginTop: "30px" }}>
              dont't have acc,{" "}
              <span
                onClick={register}
                style={{ color: "var(--reddit)", cursor: "pointer" }}
              >
                Register
              </span>
            </p>
          </>
        ) : !regForm ? (
          <>
            <div className="log_modal_block1">
              <p>Log In</p>
              <p>
                By continuing, you agree to our User Agreement and <br />{" "}
                acknowledge that you understand the Privacy Policy.
              </p>
            </div>

            <div className="login_button">
              <div className="login_btn" onClick={googleLogIn}>
                {googleAuthIcon}
                <p>Log With Google</p>
              </div>

              <div className="login_btn" onClick={login}>
                <>
                  {emailIcon}
                  <p>Log With Email</p>
                </>
              </div>
            </div>

            <p style={{ marginTop: "30px" }}>
              dont't have acc,{" "}
              <span
                onClick={register}
                style={{ color: "var(--reddit)", cursor: "pointer" }}
              >
                Register
              </span>
            </p>
          </>
        ) : (
          <>
          <RegisterForm />
          <p style={{marginTop:"15px"}}>do you have acc ? <span style={{color:"var(--reddit)", cursor:"pointer"}} onClick={closeLoginRegWindows}>Log in</span></p>
          </>
        )}
      </div>
    </>
  );
};

export default Login;
