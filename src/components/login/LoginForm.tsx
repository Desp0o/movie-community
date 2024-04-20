import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setModalVisible } from "../../Redux/loginModalSlicer";
import { setUser } from "../../Redux/userSlicer";
import { useRefetchHook } from "../../hooks/useRefetchHook";
import { setRefetch } from "../../Redux/RefetchSlicer";
import { eyeIcon } from "../../assets/svg/eyeIco";
import InputComponent from "../inputComponent/InputComponent";
import LoginButtons from "./SocialLogins";
import { RegErrMsg } from "./RegErrMsg";

const LoginForm = () => {
  const dispatch = useDispatch();
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

      localStorage.setItem("token", response?.data?.token);
      localStorage.setItem("token_death", response?.data?.token_death);
      localStorage.setItem("userID", response.data?.user?.id);
      localStorage.setItem("userName", response.data?.user?.name);
      dispatch(setRefetch(!requestRefetch));
      dispatch(setModalVisible(false));
      dispatch(
        setUser({
          name: response?.data?.user?.name,
          avatar: response?.data?.user?.avatar,
          userID: response?.data?.user?.id,
        })
      );

      setError(false); //error panel hide
      console.log(response);
      
      //eslint-disable-next-line
    } catch (error: any) {
      console.error(error.response.data)
      setError(true);
      setErrMessage({
        ...errMessage,
        emailErr: error?.response?.data?.errors?.email,
        passwordErr: error?.response?.data?.errors?.password,
        normalErr: error?.response?.data?.message
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="login_form" onSubmit={LogInFunction}>
      {isError && (
        <div
          className="err_panel_log"
          style={{
            gap: errMessage.emailErr && errMessage.passwordErr ? "2px" : "0px",
          }}
        >

          {/* თუ ერორი არიეს ეს მაშინ მხოლოდ ეს შეტყობინება გამოდის */}
          {errMessage.normalErr === "Invalid email or password" &&  <RegErrMsg message='Invalid email or password' />}

          {/* იმეილის ერორის */}
          {errMessage.emailErr &&  <RegErrMsg message={errMessage.emailErr} />}
           
          {/* //თუ პაროლის ერორია */}
          {errMessage.passwordErr && <RegErrMsg message={errMessage.passwordErr} />}

        </div>
      )}

      <InputComponent
        type="email"
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

     <LoginButtons buttonName="Log in" funName={LogInFunction}/>
    </form>
  );
};

export default LoginForm;
