import { useState } from "react";
import LoginModalBtn from "./LoginModalBtn";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setModalVisible } from "../../Redux/loginModalSlicer";
import { setUser } from "../../Redux/userSlicer";
import { useRefetchHook } from "../../hooks/useRefetchHook";
import { setRefetch } from "../../Redux/RefetchSlicer";
import { eyeIcon } from "../../assets/svg/eyeIco";
import { line } from "../../assets/svg/line";
import { Facebook } from "../../assets/svg/facebook";
import { GoogleIcon } from "../../assets/svg/googleIcon";
import { useGoogleLogIn } from "../../hooks/useGoogleAuth";
import SocLogBtn from "./SocLogBtn";
import { ErrorIcon } from "../../assets/svg/errorIcon";
import InputComponent from "../inputComponent/InputComponent";

const LoginForm = () => {
  const dispatch = useDispatch();
  const { googleLogIn } = useGoogleLogIn();
  const { requestRefetch } = useRefetchHook();
  const [_isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [errMessage, setErrMessage] = useState({
    emailErr: "",
    passwordErr: "",
    normalErr: "",
  });

  const [loginInputs, setLoginInputs] = useState({
    email: "",
    password: "",
  });

  const handlePwdVisibility = () => {
    setShowPwd(!showPwd);
  };

  const LogInFunction = async () => {
    setError(false);
    setErrMessage({ ...errMessage, emailErr: "", passwordErr: "" });
    setLoading(true);

    try {
      const response = await axios.post(
        import.meta.env.VITE_LOGIN,
        loginInputs,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("token_death", response.data.token_death);
      localStorage.setItem("userID", response.data.user.id);
      localStorage.setItem("userName", response.data.user.name);
      dispatch(setRefetch(!requestRefetch));
      dispatch(setModalVisible(false));
      dispatch(
        setUser({
          name: response.data.user.name,
          avatar: response.data.user.avatar,
          userID: response.data.user.id,
        })
      );

      setError(false); //error panel hide
      console.log(response.data);

      //eslint-disable-next-line
    } catch (error: any) {
      console.log(error.response.data.errors);
      setError(true);
      setErrMessage({
        ...errMessage,
        emailErr: error.response.data.errors.email,
        passwordErr: error.response.data.errors.password,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="login_form">
      {isError && (
        <div
          className="err_panel_log"
          style={{
            gap: errMessage.emailErr && errMessage.passwordErr ? "2px" : "10px",
          }}
        >
          {/* თუ მეილის ერორია */}
          <div>
            {errMessage.emailErr ? (
              <div className="error_container">
                {ErrorIcon}
                <p style={{ fontSize: "14px", lineHeight: "16px" }}>
                  {errMessage.emailErr}
                </p>
              </div>
            ) : (
              <></>
            )}

            {/* //თუ პაროლის ერორია */}
            {errMessage.passwordErr ? (
              <div className="error_container">
                {ErrorIcon}
                <p style={{ fontSize: "14px", lineHeight: "16px" }}>
                  {errMessage.passwordErr}
                </p>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      )}

      <InputComponent
        type="text"
        autoComplete="current-email"
        placeholder={"Email"}
        value={loginInputs.email}
        isError={errMessage.emailErr ? true : false}
        onChange={(e) =>
          setLoginInputs({ ...loginInputs, email: e.target.value })
        }
      />

      <div className="pasword_input_container">
        <span className="eye_icon" onClick={handlePwdVisibility}>
          {eyeIcon}
        </span>

        <InputComponent
          type={showPwd ? "text" : "password"}
          autoComplete="current-password"
          placeholder={"Password"}
          value={loginInputs.password}
          isError={errMessage.passwordErr ? true : false}
          onChange={(e) =>
            setLoginInputs({ ...loginInputs, password: e.target.value })
          }
        />
      </div>

      <p className="forget_pwd">Forget password?</p>

      <div className="login_btns">
        <LoginModalBtn title={"Log in"} funName={LogInFunction} />

        <div className="modal_lines">
          {line}
          <p className="or">OR</p>
          {line}
        </div>

        <div className="fb_google">
          <SocLogBtn
            socialName={"Sign in with Facebook"}
            icon={Facebook}
            funcName={() => {}}
          />
          <SocLogBtn
            socialName={"Sign in with Google"}
            icon={GoogleIcon}
            funcName={googleLogIn}
          />
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
