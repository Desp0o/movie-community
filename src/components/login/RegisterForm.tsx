import { useState } from "react";
import axios from "axios";
import "./login.css";
import { setModalVisible } from "../../Redux/loginModalSlicer";
import { setUser } from "../../Redux/userSlicer";
import { useDispatch } from "react-redux";
import InputComponent from "../inputComponent/InputComponent";
import { eyeIcon } from "../../assets/svg/eyeIco";
import { RegErrMsg } from "./RegErrMsg";
import SocialLogins from "./SocialLogins";
import { checked } from "../../assets/svg/checked";
import { unchecked } from "../../assets/svg/unchecked";

const loginPath = import.meta.env.VITE_LOGIN;
const regPath = import.meta.env.VITE_REGISTER;

const RegisterForm = () => {
  const dispatch = useDispatch();
  const [isChecked, setChecked] = useState(false)
  const [_response, _setResponse] = useState("");
  const [_isLoading, setLoading] = useState(false);
  const [_isPwdEqual, setPwdEqual] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [errMsg, setErrMsg] = useState('')
  const [showRePwd, setReShowPwd] = useState(false);
  const [regInputs, setRegInputs] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [errorHandlers, _setErrorHandler] = useState({
    nameError: false,
    emailError: false,
    passwordError: false,
    rePasswordError: false,
  })

  const regUser = async () => {
    setErrMsg('')

    if (isChecked) {
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

          localStorage.setItem("avatar", res?.data?.user?.avatar)
          localStorage.setItem("token", res?.data?.token);
          localStorage.setItem("token_death", res?.data?.token_death);
          localStorage.setItem("userID", res.data?.user?.id);
          localStorage.setItem("userName", res.data?.user?.name);
          localStorage.setItem("score", res.data?.user?.point);
          localStorage.setItem("bells", res.data?.user?.bells);
          localStorage.setItem("isAuthenticated", "true");

          dispatch(setModalVisible(false));
          dispatch(
            setUser({
              name: res?.data?.user?.name,
              avatar: res?.data?.user?.avatar,
              userID: res?.data?.user?.id,
              bells: res?.data?.user?.bells,
              score: res?.data?.user?.score,
              isAuthenticated: true
            })
          );
        }
      } catch (error: any) {

        for (const key in error.response.data.errors) {
          // Check if the errors array for the current key is not empty
          if (error.response.data.errors[key].length > 0) {
            // Log the first error message for the current key
            setErrMsg(error.response.data.errors[key][0].substring(0, error.response.data.errors[key][0].length - 1));

            // Exit the loop after logging the first error
            break;
          }
        }

      } finally {
        setLoading(false);
      }
    }

    if (regInputs.password_confirmation !== regInputs.password) {
      setPwdEqual(true);
      setErrMsg('Passwords do not match')
      return
    }
  };

  return (
    <>
      <form className="reg_form" onSubmit={regUser}>

        {/* სახელის ინპუტი და ერორი */}
        {errMsg === 'The name field is required' && <RegErrMsg message={errMsg} />}
        <InputComponent
          type="text"
          autoComplete="name"
          nameProp="name"
          placeholder="Name"
          value={regInputs.name}
          isError={errorHandlers.nameError ? true : false}
          onChange={(e) => setRegInputs({ ...regInputs, name: e.target.value })}
        />

        {/* იმეილის ინპუტი და ერორი */}
        {errMsg === 'The email field is required' || errMsg === 'The email field must be a valid email address' && <RegErrMsg message={errMsg} />}
        <InputComponent
          type="email"
          autoComplete="current-email"
          placeholder="Email"
          nameProp="emailreg"
          value={regInputs.email}
          isError={errorHandlers.emailError ? true : false}
          onChange={(e) => setRegInputs({ ...regInputs, email: e.target.value })}
        />

        {/* პაროლი და ერორი */}
        {errMsg === 'The password field is required' && <RegErrMsg message={errMsg} />}
        <div className="pasword_input_container">
          <span className="eye_icon" onClick={() => setShowPwd(!showPwd)}>
            {eyeIcon}
          </span>
          <InputComponent
            nameProp="paswdreg"
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

        {errorHandlers.passwordError && <RegErrMsg message={errMsg} />}
        <div className="pasword_input_container">
          <span className="eye_icon" onClick={() => setReShowPwd(!showRePwd)}>
            {eyeIcon}
          </span>
          <InputComponent
            nameProp="curpaswd"
            type={showRePwd ? "text" : "password"}
            autoComplete={"current_password"}
            placeholder="Password"
            value={regInputs.password_confirmation}
            isError={errorHandlers.passwordError ? true : false}
            onChange={(e) =>
              setRegInputs({
                ...regInputs,
                password_confirmation: e.target.value,
              })
            }
          />
        </div>

        <div className="checkbox_reg">
          <span style={{ cursor: "pointer" }} onClick={() => setChecked(!isChecked)}> {isChecked ? checked : unchecked} </span>
          <p className="checkbox_text">I agree with the <span className="checkbox_span">Terms</span> and <span className="checkbox_span">Privacy policy</span></p>
        </div>

        <span style={{ marginTop: "-12px" }}><SocialLogins funName={regUser} buttonName={"Create accaunt"} /></span>

      </form>

    </>
  );
};

export default RegisterForm;
