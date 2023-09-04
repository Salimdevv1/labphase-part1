import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';


export default function Home({user , setAuth,auth}) {
    const [newTodo , setNewTodo]=useState({
        id:Date.now(),
        userId:user.id,
        
    })
    const [msg , setMsg]=useState('')
    const handleChange=(e)=>{
      
        setNewTodo(prev=>{return{...prev , [e.target.name]: e.target.value}})
    }
    const AddTodo=(e)=>{
        alert('Todo Added Successfully')
        document.getElementById('todo').value = ""
        e.preventDefault();
        axios.post("http://localhost:3000/todos" , newTodo).then(res=>setMsg('Todo Added Successfully')).catch(err=>console.log(err))

    }
    const navigate=useNavigate();
    const [logout , setLogout]=useState(true);
    const [todos,setTodos]=useState([])

    useEffect(()=>{
        !auth ? navigate('/'):null; 
    },[logout]) ; 
    useEffect(
        ()=>{
            axios.get("http://localhost:3000/todos").then(res=>setTodos(res.data.filter(e=>e.userId===user.id))).catch(err=>console.log(err))
        },[msg]
        
        

    )


  return (
    <center><div className='container' style={{maxWidth : 1920 }}>
        <h1 style={{textAlign :"center" , marginTop : "1rem"}}>Welcome {user.username} !  </h1>
       <br></br>
       <form>
        <div style={{display:"flex" , alignItems:"center" , maxWidth:1200}}>
        <input id='todo'  name="content" type="text" class="form-control" placeholder="Add Your New Todo" aria-label="Username" aria-describedby="addon-wrapping" onChange={(e)=>handleChange(e)}/>
        <input name='date' type="date" class="form-control" onChange={(e)=>handleChange(e)} />
        <button name='checked' onClick={(ev)=>AddTodo(ev)} type="button" class="btn btn-primary" style={{marginLeft :"1rem"}}>Add</button>
        </div><br></br>
        <div style={{display :"flex" , alignItems:"center" , justifyContent:"center"}}>
        <p style={{fontSize :20}}>{msg}</p>
        
        </div>
       </form><br></br>
       <h2>Your Tasks</h2><br></br>
       <div >
        {
            todos?.map(e=>(
                <div  style={{borderRadius : 10, border : "1px solid black" , maxWidth : 1200 , justifyContent : "space-around", display :"flex", alignItems:"center" , margin : 13 , height : 80}}>
                <p style={{fontSize: 30 , textDecoration:e.checked?'line-through' : null}}>{e.content}</p>
                <p style={{textDecoration:e.checked?'line-thourgh' : null}}>{e.date}</p>
                <div style={{display :"flex" , alignItems:"center" , justifyContent:"space-around"}}>
                <button class="btn btn-danger" >Delete</button>
                <button class="btn btn-info" style={{marginLeft : "1rem"}} >Update</button>
                <button class="btn btn-success" style={{marginLeft : "1rem" }}>Check</button>
                </div>
                </div> 
                
            ))
             }
        </div> <br></br>
        <button onClick={()=>{setLogout(prev=>!prev) ; setAuth(false)}} type="button" class="btn btn-danger"><img src="/logout.svg" alt="" style={{marginRight:"1rem" , width : 20}} />Logout</button>


</div></center>
  )
}
