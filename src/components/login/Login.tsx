import { useDispatch } from "react-redux"
import { xIcon } from "../../assets/svg/Xicon"
import { googleAuthIcon } from "../../assets/svg/google"
import { useDarkModeHook } from "../../hooks/useDarkModeHook"
import { useGoogleLogIn } from "../../hooks/useGoogleAuth"
import "./login.css"
import { setModalVisible } from "../../Redux/loginModalSlicer"

const Login = () => {
  const dispatch = useDispatch()
  const { googleLogIn } = useGoogleLogIn()
  const { isDark } = useDarkModeHook()

  const modalCloser = () => {
    dispatch(setModalVisible(false))
  }

  return (
    <div className={isDark ? "login_modal dark" : "login_modal"}>
      <div className={isDark ? "x_icon_login_modal dark" : "x_icon_login_modal"} onClick={modalCloser}>{xIcon}</div>
        <div className="log_modal_block1">
            <p>Log In</p>
            <p>By continuing, you agree to our User Agreement and <br/> acknowledge that you understand the Privacy Policy.</p>
        </div>

        <div className="google_login">
          <div className="google_login_btn" onClick={googleLogIn}>
            {googleAuthIcon}
            Google
          </div>
        </div>
        
    </div>
  )
}

export default Login