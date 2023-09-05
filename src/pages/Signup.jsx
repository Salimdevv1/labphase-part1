import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from"axios" ;
import { useNavigate } from 'react-router-dom'


export default function Signup() {
    const [msg , setMsg]=useState('')
    const [newUser , setNewUser]=useState({
        id:Date.now(),
    })
    const [passwordType, setPasswordType] = useState("password");
    const [passwordInput, setPasswordInput] = useState("");
    const handlePasswordChange =(event)=>{
        setPasswordInput(event.target.value);
        setNewUser((prev)=>{return {...prev , [event.target.name] : event.target.value}})
    }
    const togglePassword =()=>{
      if(passwordType==="password")
      {
       setPasswordType("text")
       return;
      }
      setPasswordType("password")
    }

    const navigate = useNavigate()
    const handleChange=(event)=>{
        setNewUser((prev)=>{return {...prev , [event.target.name] : event.target.value}})
    }

    const handleSignup=(event)=>{
        event.preventDefault();
        navigate('/') 
 axios
    .post("http://localhost:3000/users", newUser)
    .then((res) => setMsg("Your account has been created ! ")    )
    .catch((err) => console.log(err))

    }
  return (
    <center><div class="container" style={{marginTop : 100}}>
    <h1 class="text-center ">Sign Up And Join Us</h1><br></br>
    <img src="/user.png" alt="" style={{width :200}} /><br></br><br></br>
    <input style={{maxWidth : 540}} class="form-control"   type="text" name='username' placeholder="Username" onChange={(e)=>handleChange(e)}  /><br></br><br></br>
    <input style={{maxWidth : 540}} class="form-control"   type="email" name='email' placeholder="Email" onChange={(e)=>handleChange(e)}  /><br></br><br></br>
    <div class="input-group" style={{display:"flex" , alignItems :"center" , justifyContent:"center"}}>
    <input id='inputField' style={{maxWidth : 500}}  type={passwordType} onChange={handlePasswordChange} value={passwordInput}  name="password" class="form-control" placeholder="Password" />
        <div class="input-group-text">
            <button id='toggleShow' onClick={togglePassword}>
            { passwordType==="password"? <img src='/eye-slash.svg'/> :<img src='/eye-fill.svg'/> }
            </button>    
        </div>
    </div><br></br>
  <button onClick={(e)=>handleSignup(e)}  type="button" class="btn btn-primary">Sign Up</button><br></br><br></br>
  <p style={{fontSize : 20}}>Already have an account ?<Link to="/"> Login </Link></p>
  <p style={{color:"green" , textAlign:"center"}}>{msg}</p>

    </div></center>
  )
}
