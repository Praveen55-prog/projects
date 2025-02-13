import { useEffect, useState } from "react"
import { loginuser } from "../../actions/authAction"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import {Link, useNavigate } from "react-router-dom"


export default function Login(){
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const navigate=useNavigate()
    
    const {loading,error,isAuthenticated}=useSelector(state=>state.authState)
    const dispatch=useDispatch()
    
    const loginHandler=(e)=>{
        e.preventDefault()
        dispatch(loginuser(email,password))
    }

    useEffect(()=>{
        if (isAuthenticated){
            return navigate('/')
        }
        if (!isAuthenticated && !loading){
          return navigate('/praveen/loginUser')
      }
        if(error){
          return toast.error(error,{
                position:"bottom-center"
            })
            
        }
    },[error,isAuthenticated,navigate,loading])
    return(
        <div className="row wrapper"> 
		<div className="col-10 col-lg-5">
        <form className="shadow-lg" onSubmit={loginHandler}>
            <h1 className="mb-3">Login</h1>
            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
              />
            </div>
  
            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              />
            </div>

            <a href="javascript;" className="float-right mb-4">Forgot Password?</a>
  
            <button
              id="login_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={loading}
            >
              LOGIN
            </button>

            <Link to={'/register'}  onClick={()=>navigate('/praveen/register')} className="float-right mt-3">New User?</Link>
          </form>
		  </div>
    </div>
    )
}