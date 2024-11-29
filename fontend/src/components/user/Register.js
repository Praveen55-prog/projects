import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { clearAuthError, registeruser } from "../../actions/authAction"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

export default function Register(){
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const {loading,isAuthenticated,error}=useSelector(state=>state.authState)
    const dispatch=useDispatch()
    const navigate=useNavigate()

    const registerHandler=(e)=>{
        e.preventDefault()
        dispatch(registeruser(name,email,password))

    }
    useEffect(()=>{
        if(isAuthenticated){
             navigate('/')
             return
        }
        if(!isAuthenticated){
          navigate('/register')
        }

        if(error){
            toast(error,{
                position:"bottom-center",
                type:'error',
                onOpen:()=>{dispatch(clearAuthError)}
            })
        }
    },[error,isAuthenticated,navigate,dispatch])
    return(
        <div className="row wrapper">
		<div className="col-10 col-lg-5">
        <form className="shadow-lg" encType='multipart/form-data'
        onSubmit={registerHandler}>
            <h1 className="mb-3">Register</h1>

          <div className="form-group">
            <label htmlFor="email_field">Name</label>
            <input type="name" id="name_field" className="form-control" value={name}
            onChange={(e)=>setName(e.target.value)} />
          </div>

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

            <div className='form-group'>
              <label htmlFor='avatar_upload'>Avatar</label>
              <div className='d-flex align-items-center'>
                  <div>
                      <figure className='avatar mr-3 item-rtl'>
                          <img
                              src="/images/profile.jpg"
                              className='rounded-circle'
                              alt='image'
                          />
                      </figure>
                  </div>
                  <div className='custom-file'>
                      <input
                          type='file'
                          name='avatar'
                          className='custom-file-input'
                          id='customFile'
                      />
                      <label className='custom-file-label' htmlFor='customFile'>
                          Choose Avatar
                      </label>
                  </div>
              </div>
          </div>
  
            <button
              id="register_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={loading}
            >
              REGISTER
            </button>
          </form>
		  </div>
    </div>
    )
}