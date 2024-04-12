import { useState } from "react"
import LoginModalBtn from "./LoginModalBtn"
import axios from "axios"
import "./login.css"

const RegisterForm = () => {
    const [response, setResponse] = useState('')
    const [isPwdEqual, setPwdEqual] = useState(false)
    const [regInputs, setRegInputs] = useState({
        name: '',
        email: '',
        Password: '',
        rePassword: ''
    })

    const regUser = async () => {

        if(regInputs.rePassword === regInputs.Password && regInputs.Password.length !== 0){
            setPwdEqual(false)
            try {
                const res = await axios.post('https://api.pinky.ge/api/register',regInputs,{
                    headers:{
                        'Content-Type': 'application/json'
                    }
                })
    
                console.log(res.data);
                setResponse(res.data.message)
                
            } catch (error) {
                console.log(error);
                
            }
        }

        if(regInputs.rePassword !== regInputs.Password){
            console.log('pass do not match');
            setPwdEqual(true)
            return
        }

    }

  return (
    <>
        <p className="register_title">Register</p>
        <form className="reg_form" onSubmit={regUser}> 
            <input placeholder="Name" name='name' value={regInputs.name} type="text" className="form_inputs" onChange={(e)=>setRegInputs({ ...regInputs, name: e.target.value })}/>
            <input placeholder="Email" name="email" value={regInputs.email} type="text" className="form_inputs" onChange={(e)=>setRegInputs({ ...regInputs, email: e.target.value })}/>
            <input placeholder="Password" name="password" value={regInputs.Password} type="password" className="form_inputs" onChange={(e)=>setRegInputs({ ...regInputs, Password: e.target.value })}/>
            <input placeholder="Repeat Password" name="re_password" value={regInputs.rePassword} type="password" className="form_inputs" onChange={(e)=>setRegInputs({ ...regInputs, rePassword: e.target.value })}/>

            <LoginModalBtn funName={regUser} title="Register"/>
        </form>
        {response ? <p className="reg_fomr_res_status_okey">{response}</p> : <></>}
        {isPwdEqual ? <p className="password_do_not_match">Password do not match</p> : <></>}
    </>
  )
}

export default RegisterForm
