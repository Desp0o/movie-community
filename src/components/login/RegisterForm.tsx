import { useState } from "react"
import LoginModalBtn from "./LoginModalBtn"
import axios from "axios"

const RegisterForm = () => {
    const [regInputs, setRegInputs] = useState({
        name: '',
        email: '',
        Password: ''
    })

    const regUser = async () => {

        try {
            const response = await axios.post('https://api.pinky.ge/api/register',regInputs,{
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
    <div>
        <p className="register_title">Register</p>
        <form className="reg_form" onSubmit={regUser}> 
            <input placeholder="Name" name='name' value={regInputs.name} type="text" className="reg_form_inputs" onChange={(e)=>setRegInputs({ ...regInputs, name: e.target.value })}/>
            <input placeholder="Email" name="email" value={regInputs.email} type="text" className="reg_form_inputs" onChange={(e)=>setRegInputs({ ...regInputs, email: e.target.value })}/>
            <input placeholder="Password" name="password" value={regInputs.Password} type="password" className="reg_form_inputs" onChange={(e)=>setRegInputs({ ...regInputs, Password: e.target.value })}/>

            <LoginModalBtn funName={regUser} title="Register"/>
        </form>
    </div>
  )
}

export default RegisterForm
