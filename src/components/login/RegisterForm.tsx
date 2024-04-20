import { useState } from "react";
import axios from "axios";
import "./login.css";
import { setModalVisible } from "../../Redux/loginModalSlicer";
import { setUser } from "../../Redux/userSlicer";
import { useDispatch } from "react-redux";
import InputComponent from "../inputComponent/InputComponent";
import { eyeIcon } from "../../assets/svg/eyeIco";
import { RegErrMsg } from "./RegErrMsg";
import LoginModalBtn from "./LoginModalBtn";

const loginPath = import.meta.env.VITE_LOGIN;
const regPath = import.meta.env.VITE_REGISTER;

const RegisterForm = () => {
  const dispatch = useDispatch();
  const [_response, _setResponse] = useState("");
  const [_isLoading, setLoading] = useState(false);
  const [_isPwdEqual, setPwdEqual] = useState(false);
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
    setErrorHandler({...errorHandlers, nameError: false,
        nameErrorMessage: "",
        emailError: false,
        emailErrorMessage: "",
        passwordError: false,
        passwordErrorMessage: "",
        rePasswordError: false,
        rePasswordErrorMessage: ""})
   
      setLoading(true);
      setPwdEqual(false);
      try {
        const res = await axios.post(regPath, regInputs, {
          headers: {
            "Content-Type": "application/json",
          },
        });

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
      } catch (error:any) {
        console.error(error.response.data.errors);
        const errorResponse = error.response.data.errors
        setErrorHandler({
            ...errorHandlers, 
            nameError: errorResponse?.name && true,
            nameErrorMessage: errorResponse?.name,
            emailError: errorResponse?.email && true,
            emailErrorMessage: errorResponse?.email,
            passwordError: errorResponse?.password && true,
            passwordErrorMessage: errorResponse?.password
        })
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

        {/* სახელის ინპუტი და ერორი */}
        {errorHandlers.nameError && <RegErrMsg message={errorHandlers.nameErrorMessage}/>}
        <InputComponent
          type="text"
          autoComplete="name"
          placeholder="Name"
          value={regInputs.name}
          isError={errorHandlers.nameError ? true : false}
          onChange={(e) => setRegInputs({ ...regInputs, name: e.target.value })}
        />

        {/* იმეილის ინპუტი და ერორი */}
        {errorHandlers.emailError && <RegErrMsg message={errorHandlers.emailErrorMessage}/>}
        <InputComponent
          type="email"
          autoComplete="current-email"
          placeholder="Email"
          value={regInputs.email}
          isError={errorHandlers.emailError ? true : false}
          onChange={(e) => setRegInputs({ ...regInputs, email: e.target.value })}
        />

        {/* პაროლი და ერორი */}
        {errorHandlers.passwordError && <RegErrMsg message={errorHandlers.passwordErrorMessage}/>}
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

            <LoginModalBtn title={"Create accaunt"} funName={regUser} />
      </form>

    </>
  );
};

export default RegisterForm;
