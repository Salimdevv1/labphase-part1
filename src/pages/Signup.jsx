import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from"axios" ;
import { useNavigate } from 'react-router-dom'


export default function Signup() {
    const [msg , setMsg]=useState('')
    const [newUser , setNewUser]=useState({
        id:Date.now(),
    })
    const navigate = useNavigate()
    const handleChange=(event)=>{
        setNewUser((prev)=>{return {...prev , [event.target.name] : event.target.value}})
    }

    const handleSignup=(event)=>{
        event.preventDefault();
        navigate('/') 
 axios
    .post("http://localhost:3000/users", newUser)
    .then((res) => setMsg("your account is valid")    )
    .catch((err) => console.log(err))

    }
  return (
    <center><div class="container" style={{padding : "15rem"}}>
    <h1 class="text-center ">Create Your New Account</h1><br></br>
    <img src="/user.png" alt="" style={{width :200}} />
    <div class="form-floating" style={{maxWidth : 600}}>
    <input name='username' type="text" class="form-control" id="floatingInputGroup1" placeholder="Username" onChange={(e)=>handleChange(e)}/>
    <label for="floatingInputGroup1">Username</label>
  </div>
    <div class="form-floating" style={{maxWidth : 600 , marginTop : "1rem"}}>
    <input name='email' type="email" class="form-control" id="floatingInputGroup1" placeholder="Email" onChange={(e)=>handleChange(e)}/>
    <label for="floatingInputGroup1">Email</label>
  </div>
  <div class="form-floating" style={{maxWidth : 600 , marginTop : "1rem"}} >
    <input name='password' type="password" class="form-control" id="floatingInputGroup1" placeholder="Password" onChange={(e)=>handleChange(e)}  />
    <label for="floatingInputGroup1">Password</label>
  </div><br></br>
  <button onClick={(e)=>handleSignup(e)}  type="button" class="btn btn-primary">Sign Up</button><br></br><br></br>
  <p>Already have an account ?<Link to="/"> Login </Link></p>
  <p style={{color:"green" , textAlign:"center"}}>{msg}</p>

    </div></center>
  )
}
