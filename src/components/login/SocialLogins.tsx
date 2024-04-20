import React from 'react'
import "./login.css"
import LoginModalBtn from './LoginModalBtn'
import { line } from '../../assets/svg/line'
import SocLogBtn from './SocLogBtn'
import { Facebook } from '../../assets/svg/facebook'
import { GoogleIcon } from '../../assets/svg/googleIcon'
import { useGoogleLogIn } from '../../hooks/useGoogleAuth'

interface SocialLoginsProps {
    funName?: ()=>void
}

const LoginButtons:React.FC<SocialLoginsProps> = ({funName}) => {
  const { googleLogIn } = useGoogleLogIn();

  return (
    <div className="login_btns">
        <LoginModalBtn title="Log in" funName={funName ? funName : ()=>{}} />

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
  )
}

export default LoginButtons