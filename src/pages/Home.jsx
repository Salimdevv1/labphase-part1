import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';

export default function Home({user , setAuth,auth , darkMode , setDarkMode}) {
    const checked =(false)
    const [newTodo , setNewTodo]=useState({
        id:Date.now(),
        userId:user.id,
        checked : checked,
        
    })
    const [msg , setMsg]=useState('')
    const handleChange=(e)=>{
      
        setNewTodo(prev=>{return{...prev , [e.target.name]: e.target.value}})
    }
    const AddTodo=(e)=>{
        alert('Todo Added Successfully')
        e.preventDefault();
        document.getElementById('inputField').value = ""
        axios.post("http://localhost:3000/todos" , newTodo).then(res=>setMsg('Task Added')).catch(err=>console.log(err))

    } 
    const [check , setCheck] = useState(false)
    const checkTodo=()=>{
        setCheck(!check);
        if (check){
            document.getElementById('salimdev').style.textDecoration ="line-through"
        } else{
            document.getElementById('salimdev').style.textDecoration ="none"

        }
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
        },[msg],
)
  return (
    <center><div style={{maxWidth : 1920 , padding : "10rem" }} className='container'>
        <h1 id='demo' style={{fontSize : 80}}>Just Do It.</h1>
       <br></br>
       <form >
        <div style={{display:"flex" , alignItems:"center" , maxWidth: 1920 ,minWidth : 300 , justifyContent:"space-around"}}>
        <input class="form-control" type="text" name='content' placeholder="Add a task" onChange={(e)=>handleChange(e)} id='inputField' />
        <input class="form-control" style={{marginLeft :"1rem"}} type="date" name='date' placeholder="Add Your New Todo" onChange={(e)=>handleChange(e)}  id='inputField'/>
        <button type="button" class="btn btn-primary" onClick={(ev)=>AddTodo(ev)} style={{marginLeft :"1rem" , minWidth : 100}}>I Got This</button>
        </div><br></br>
        <div style={{display :"flex" , alignItems:"center" , justifyContent:"center"}}>
        </div>
       </form><br></br>
       <h2>Your Tasks</h2><br></br>
       <div>
        {todos?.map(e=>(    
            <div className='container' id='task-container'>
                <div id='tasks-container'>
                <p style={{textDecoration:e.checked?"line-through":null}} id='salimdev'>{e.content}</p>
                <p >{e.date}</p>
                </div>
                <div id='div-btn'>
                    <button id="btn"><img src="/trash-fill.svg" alt="" style={{width : 30}} /></button>
                    <button id="btn" onClick={()=>checkTodo()}><img src="/check-lg.svg" alt="" style={{width : 30}}  /></button>
                </div>
            </div>
        ))}

        </div> <br></br>
        <p style={{fontSize : 23}}> You Have {todos.reduce((total , el)=>1+total, 0)} Task{todos.length>1?(<span>s</span>): null}  To Do</p>
        <button onClick={()=>{setLogout(prev=>!prev) ; setAuth(false)}} type="button" class="btn btn-danger">Logout</button>
    </div></center>
  )

}
