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

const LoginForm = () => {
  const dispatch = useDispatch();
  const { googleLogIn } = useGoogleLogIn();
  const { requestRefetch } = useRefetchHook();
  const [isLoading, setLoading] = useState(false);

  const [loginInputs, setLoginInputs] = useState({
    email: "",
    password: "",
  });

  const LogInFunction = async () => {
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

      console.log(response.data);

      //eslint-disable-next-line
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="login_form">
      <input
        type="text"
        className="input_style"
        value={loginInputs.email}
        onChange={(e) => {
          setLoginInputs({ ...loginInputs, email: e.target.value });
        }}
        placeholder="Name"
      />

      <div className="pasword_input_container">
        <span className="eye_icon">{eyeIcon}</span>
        <input
          type="password"
          className="input_style"
          value={loginInputs.password}
          onChange={(e) => {
            setLoginInputs({ ...loginInputs, password: e.target.value });
          }}
          placeholder="Name"
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
          <div className="social_login_btn">
            {Facebook}
            <p>Sign in with Facebook</p>
          </div>

          <div className="social_login_btn" onClick={googleLogIn}>
            {GoogleIcon}
            <p>Sign in with Google</p>
          </div>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
