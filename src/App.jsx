import React , { useEffect, useState } from 'react'
import Signup from './pages/Signup'
import Login from './pages/Login'
import { Routes ,Route } from 'react-router-dom'
import Home from './pages/Home'
import DarkMode from './component/DarkMode'

export default function App() {

  const [auth , setAuth] =useState(false);
  const [userAuth,setUserAuth] = useState({});
  
  
  return (
    <div className='container'>
      <div>
      <DarkMode></DarkMode>
      </div>
      <Routes>
        <Route path="/" element={<Login setUserAuth={setUserAuth} setAuth={setAuth} />} />
        <Route path="/signup" element={<Signup/>} />
        <Route path='/home' element={<Home user={userAuth} setAuth={setAuth} auth={auth}/>}></Route>
      </Routes>
    </div>
    
      )
}
