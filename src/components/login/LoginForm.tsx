import { useState } from "react"
import LoginModalBtn from "./LoginModalBtn"
import axios from "axios"
import { useDispatch } from "react-redux"
import { setModalVisible } from "../../Redux/loginModalSlicer"
import { setUser } from "../../Redux/userSlicer"

const LoginForm = () => {
  const dispatch = useDispatch()
  const [loginInputs, setLoginInputs] = useState({
    email: '',
    password: ''
  })

  const LogInFunction = async () => {
    
    try {
      const response = await axios.post(import.meta.env.VITE_LOGIN, loginInputs, {
        headers:{
          'Content-Type': 'application/json'
        }
      })
      console.log(response.data);
      
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('token_death', response.data.token_death)
      dispatch(setModalVisible(false))
      dispatch(setUser({name: response.data.user.name, avatar: response.data.user.avatar, userID: response.data.user.id}))
      localStorage.setItem('userName', response.data.user.name)
    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <>
      <p className="login_title">login</p>
      <form className="login_form">
        <input value={loginInputs.email} name="email" type="text" placeholder="Email" className="form_inputs" onChange={(e)=> setLoginInputs({...loginInputs, email: e.target.value})} autoComplete="email"/>
        <input value={loginInputs.password} name="password" type="password" placeholder="Password" className="form_inputs"  onChange={(e)=> setLoginInputs({...loginInputs, password: e.target.value})} autoComplete="current-password"/>

        <LoginModalBtn title={"Log in"} funName={LogInFunction} />
      </form>
    </>
  )
}

export default LoginForm