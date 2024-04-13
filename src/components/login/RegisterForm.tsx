import { useState } from "react"
import LoginModalBtn from "./LoginModalBtn"
import axios from "axios"
import "./login.css"
import { setModalVisible } from "../../Redux/loginModalSlicer";
import { setUser } from "../../Redux/userSlicer";
import { useDispatch } from "react-redux";
import Fetching from "../fetchingComponent/Fetching";

const loginPath = import.meta.env.VITE_LOGIN;
const regPath = import.meta.env.VITE_REGISTER;

const RegisterForm = () => {
    const dispatch = useDispatch()
    const [response, setResponse] = useState('')
    const [isLoading, setLoading] = useState(false)
    const [isPwdEqual, setPwdEqual] = useState(false)
    const [regInputs, setRegInputs] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    })
    // const [rePassword, setRePassword] = useState('')

    const regUser = async () => {

        if(regInputs.password_confirmation === regInputs.password && regInputs.password.length !== 0){
            setLoading(true)
            setPwdEqual(false)
            try {
                const res = await axios.post(regPath,regInputs,{
                    headers:{
                        'Content-Type': 'application/json'
                    }
                })
    
                console.log(res.data);
                setResponse(res.data.message)

                if(res.data.message === 'User registered successfully'){
                    const res = await axios.post(loginPath, { email: regInputs.email, password: regInputs.password },{
                        headers:{
                            'Content-Type': 'application/json'
                        }
                    });

                    localStorage.setItem('token', res.data.token)
                    localStorage.setItem('token_death', res.data.token_death)
                    dispatch(setModalVisible(false))
                    dispatch(setUser({name: res.data.user.email, avatar: res.data.user.avatar, userID: res.data.user.id}))                    
                }
                
            } catch (error) {
                console.log(error);
                
            }
            finally{
                setLoading(false)
            }
        }

        if(regInputs.password_confirmation !== regInputs.password){
            console.log('pass do not match');
            setPwdEqual(true)
            return
        }

    }

  return (
    <>
        {isLoading ? <Fetching /> : <></>}
        <p className="register_title">Register</p>
        <form className="reg_form" onSubmit={regUser}> 
            <input placeholder="Name" name='name' value={regInputs.name} type="text" className="form_inputs" onChange={(e)=>setRegInputs({ ...regInputs, name: e.target.value })} autoComplete="name"/>
            <input placeholder="Email" name="email" value={regInputs.email} type="text" className="form_inputs" onChange={(e)=>setRegInputs({ ...regInputs, email: e.target.value })} autoComplete="email"/>
            <input placeholder="Password" name="password" value={regInputs.password} type="password" className="form_inputs" onChange={(e)=>setRegInputs({ ...regInputs, password: e.target.value })} autoComplete="password"/>
            <input placeholder="Repeat Password" name="re_password" value={regInputs.password_confirmation} type="password" className="form_inputs" onChange={(e)=>setRegInputs({...regInputs, password_confirmation: e.target.value})} autoComplete="password"/>

            <LoginModalBtn funName={regUser} title="Register"/>
        </form>
        {response ? <p className="reg_fomr_res_status_okey">{response}</p> : <></>}
        {isPwdEqual ? <p className="password_do_not_match">Password do not match</p> : <></>}
    </>
  )
}

export default RegisterForm
