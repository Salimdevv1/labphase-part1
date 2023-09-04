import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from"axios" ;

export default function Login({setUserAuth,setAuth}) {
    const [userInfo , setUserInfo]=useState({
        id:Date.now(),
    })
    const [users , setUsers]=useState([])
    const [msg,setMsg]=useState('')
    const navigate=useNavigate()

    const handleChange=(event)=>{
        setUserInfo((prev)=>{return {...prev , [event.target.name] : event.target.value}})
    }
    const getUsers=()=>{
        axios.get("http://localhost:3000/users").then((res)=>setUsers(res.data)).catch(err=>console.log(err))
    }
    const handleLogin=(event)=>{
        event.preventDefault();
        let user=users.find(e=>e.email===userInfo.email&&e.password===userInfo.password ) ;
        if(user){
            setAuth(true) ;
            setUserAuth(user)
            navigate('/home')  
        }else{
            setMsg("User not found")
        }
    }

    useEffect(()=>{
        
        getUsers()
    },[])
  return (
    <center><div class="container" style={{padding : "15rem"}}>
    <h1 class="text-center ">Welcome Back ! </h1><br></br>
    <img src="/user.png" alt="" style={{width :200}} />
    <div class="form-floating" style={{maxWidth : 600}}>
    <input name='email' type="email" class="form-control" id="floatingInputGroup1" placeholder="Email" onChange={(e)=>handleChange(e)} />
    <label for="floatingInputGroup1">Email</label>
  </div>
  <div class="form-floating" style={{maxWidth : 600 , marginTop : "1rem"}} >
    <input name='password' type="password" class="form-control" id="floatingInputGroup1" placeholder="Password" onChange={(e)=>handleChange(e)} />
    <label for="floatingInputGroup1">Password</label>
  </div><br></br>
  <button onClick={(e)=>handleLogin(e)}  type="button" class="btn btn-primary">Login</button><br></br><br></br>
  <p>You don't have an account ? <Link to="/signup">Sign Up</Link> </p>
  <p style={{color:"red" , textAlign:"center"}}>{msg}</p>

    </div></center>
  )
}
