import { useState } from "react";
import axios from "axios";
import "./login.css";
import { setModalVisible } from "../../Redux/loginModalSlicer";
import { setUser } from "../../Redux/userSlicer";
import { useDispatch } from "react-redux";
import InputComponent from "../inputComponent/InputComponent";
import { eyeIcon } from "../../assets/svg/eyeIco";
import LoginButtons from "./SocialLogins";
import { ErrorIcon } from "../../assets/svg/errorIcon";
import { RegErrMsg } from "./RegErrMsg";

const loginPath = import.meta.env.VITE_LOGIN;
const regPath = import.meta.env.VITE_REGISTER;

const RegisterForm = () => {
  const dispatch = useDispatch();
  const [response, setResponse] = useState("");
  const [_isLoading, setLoading] = useState(false);
  const [isPwdEqual, setPwdEqual] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [showRePwd, setReShowPwd] = useState(false);
  const [regInputs, setRegInputs] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [errorHandlers, setErrorHandler] = useState({
    nameError: false,
    nameErrorMessage: "",
    emailError: false,
    emailErrorMessage: "",
    passwordError: false,
    passwordErrorMessage: "",
    rePasswordError: false,
    rePasswordErrorMessage: ""
  })

  const regUser = async () => {
   
      setLoading(true);
      setPwdEqual(false);
      try {
        const res = await axios.post(regPath, regInputs, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        setResponse(res.data.message);

        if (res.data.message === "User registered by Mail") {
          const res = await axios.post(
            loginPath,
            { email: regInputs.email, password: regInputs.password },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          localStorage.setItem("token", res.data.token);
          localStorage.setItem("token_death", res.data.token_death);
          localStorage.setItem("userID", res.data.user.id);
          dispatch(setModalVisible(false));
          dispatch(
            setUser({
              name: res.data.user.email,
              avatar: res.data.user.avatar,
              userID: res.data.user.id,
            })
          );
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    

    if (regInputs.password_confirmation !== regInputs.password) {
      setPwdEqual(true);
      setErrorHandler(
        {
            ...errorHandlers,
            passwordError: true,
            rePasswordError: true,
            passwordErrorMessage: "Passwords do not match"
        }
      )
      return
    }
  };

  return (
    <>
      <form className="reg_form" onSubmit={regUser}>
        <InputComponent
          type="text"
          autoComplete="name"
          placeholder="Name"
          value={regInputs.name}
          isError={errorHandlers.nameError ? true : false}
          onChange={(e) => setRegInputs({ ...regInputs, name: e.target.value })}
        />

        <InputComponent
          type="text"
          autoComplete="current-email"
          placeholder="Email"
          value={regInputs.email}
          isError={errorHandlers.emailError ? true : false}
          onChange={(e) =>
            setRegInputs({ ...regInputs, email: e.target.value })
          }
        />

        {
            errorHandlers.passwordError && errorHandlers.rePasswordError 
            &&
            <RegErrMsg message={errorHandlers.passwordErrorMessage}/>  
        }

        <div className="pasword_input_container">
          <span className="eye_icon" onClick={() => setShowPwd(!showPwd)}>
            {eyeIcon}
          </span>
          <InputComponent
            type={showPwd ? "text" : "password"}
            autoComplete={"current_password"}
            placeholder="Password"
            value={regInputs.password}
            isError={errorHandlers.passwordError ? true : false}
            onChange={(e) =>
              setRegInputs({ ...regInputs, password: e.target.value })
            }
          />
        </div>

        <div className="pasword_input_container">
          <span className="eye_icon" onClick={() => setReShowPwd(!showRePwd)}>
            {eyeIcon}
          </span>
          <InputComponent
            type={showRePwd ? "text" : "password"}
            autoComplete={"current_password"}
            placeholder="Password"
            value={regInputs.password_confirmation}
            isError={errorHandlers.rePasswordError ? true : false}
            onChange={(e) =>
              setRegInputs({
                ...regInputs,
                password_confirmation: e.target.value,
              })
            }
          />
        </div>

        <LoginButtons buttonName="Create accaunt" funName={regUser} />
      </form>

      {response ? (
        <p className="reg_fomr_res_status_okey">{response}</p>
      ) : (
        <></>
      )}
      {isPwdEqual ? (
        <p className="password_do_not_match">Password do not match</p>
      ) : (
        <></>
      )}
    </>
  );
};

export default RegisterForm;
