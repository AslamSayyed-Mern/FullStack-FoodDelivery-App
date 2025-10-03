import React, { useContext, useState } from 'react'
import "./LoginPopup.css";
import axios from "axios";
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';

const LoginPopup = ({setShowLogin}) => {
    const {url,setToken}=useContext(StoreContext);

    const [curState,setCurState]=useState("Login");
    const [data,setData]=useState({
        name:"",
        email:"",
        password:""
    })
    const onChangeHandler=(event)=>{
        const name=event.target.name;
        const value=event.target.value;
        setData(data=>({...data,[name]:value}))
    }
   
    const onLogin=async(event)=>{
        event.preventDefault();
        let newUrl=url;
        if(curState==="Login"){
            newUrl+="/api/user/login"
        }
        else{
            newUrl+="/api/user/register"
        }
        const response= await axios.post(newUrl,data);

        if(response.data.success){
            setToken(response.data.token)
            localStorage.setItem("token",response.data.token);
            setShowLogin(false);
        }
        else{
            alert(response.data.message);
        }
    }

  return (
    <div className='login-popup'>
        <form onSubmit={onLogin} className='login-popup-container'>
        <div className="login-popup-title">
            <h2>{curState}</h2>
            <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
            {curState==='Login'?<></>:<input type="text" name='name' onChange={onChangeHandler} value={data.name} placeholder='Your Name' required/>}
            
            <input type="email" name='email' onChange={onChangeHandler} value={data.email} placeholder='Your Email' required/>
            <input type="password" name='password' onChange={onChangeHandler} value={data.password} placeholder='Password' required/>
        </div>
        <button type='submit'>{curState==="Sign Up"?"Create Account":"Login"}</button>
        <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>By Continuing, I agree to the terms of use & Privacy Policy</p>
        </div>
        {curState==='Login'? 
        <p style={{textAlign:"center"}}>Create a new Account? <span onClick={()=>setCurState("Sign Up")}>Click Here</span></p>:
        <p style={{textAlign:"center"}}>Already have an account? <span onClick={()=>setCurState("Login")}>Login Here</span></p>}

        
        </form>
    </div>
  )
}

export default LoginPopup