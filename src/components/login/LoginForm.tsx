import { useState } from "react"
import LoginModalBtn from "./LoginModalBtn"
import axios from "axios"
import { useDispatch } from "react-redux"
import { setModalVisible } from "../../Redux/loginModalSlicer"
import { setUser } from "../../Redux/userSlicer"
import Fetching from "../fetchingComponent/Fetching"
import { useRefetchHook } from "../../hooks/useRefetchHook"
import { setRefetch } from "../../Redux/RefetchSlicer"

const LoginForm = () => {
  const dispatch = useDispatch()
  const {requestRefetch} = useRefetchHook()
  const [isLoading, setLoading] = useState(false)
 
  const [loginInputs, setLoginInputs] = useState({
    email: '',
    password: ''
  })

  const LogInFunction = async () => {
    setLoading(true)
    try {
      const response = await axios.post(import.meta.env.VITE_LOGIN, loginInputs, {
        headers:{
          'Content-Type': 'application/json'
        }
      })
      
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('token_death', response.data.token_death)
      localStorage.setItem('userID', response.data.user.id)
      localStorage.setItem('userName', response.data.user.name)
      dispatch(setRefetch(!requestRefetch))
      dispatch(setModalVisible(false))
      dispatch(setUser({name: response.data.user.name, avatar: response.data.user.avatar, userID: response.data.user.id}))
      
      console.log(response.data);
      

      //eslint-disable-next-line
    } catch (error:any) {
      console.error(error);
    }finally{
      setLoading(false)
    }
  }

  return (
    <>
    </>
  )
}

export default LoginForm