import { useState } from "react"
import LoginModalBtn from "./LoginModalBtn"
import axios from "axios"

const LoginForm = () => {

  const [loginInputs, setLoginInputs] = useState({
    email: '',
    password: ''
  })

  const LogInFunction = async () => {
    
    try {
      const response = await axios.post('https://api.pinky.ge/api/login', loginInputs, {
        headers:{
          'Content-Type': 'application/json'
        }
      })

      console.log(response.data);
      
    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <>
      <p className="login_title">login</p>
      <form className="login_form">
        <input value={loginInputs.email} name="email" type="text" placeholder="Email" className="form_inputs" onChange={(e)=> setLoginInputs({...loginInputs, email: e.target.value})}/>
        <input value={loginInputs.password} name="password" type="password" placeholder="Password" className="form_inputs"  onChange={(e)=> setLoginInputs({...loginInputs, password: e.target.value})} />

        <LoginModalBtn title={"Log in"} funName={LogInFunction} />
      </form>
    </>
  )
}

export default LoginForm