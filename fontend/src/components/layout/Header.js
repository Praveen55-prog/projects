import React, { useEffect } from "react"
import Search from "./Search"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {DropdownButton,Dropdown,Image, DropdownMenu} from 'react-bootstrap'
import { logout } from "../../actions/authAction"

export default function Header(){
  const {loading,isAuthenticated,user}=useSelector(state=>state.authState)
  
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const logoutHandler=()=>{
    dispatch(logout)
  }

  const dashboard=()=>{
    navigate('/praveen/dashboard')
    
  }

  

  useEffect(()=>{
    if(!isAuthenticated && !loading){
      return navigate('/loginUser')
    }

  },[isAuthenticated,loading,navigate])
    return (
        
    <nav className="navbar row">
    <div className="col-12 col-md-3">
      <div className="navbar-brand">
        <Link to={'/'}><img width="150px" src="/images/praveen.png" alt="images"/></Link>
      </div>
    </div>

    <div className="col-12 col-md-6 mt-2 mt-md-0">
      <Search />
    </div>

    <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
      {isAuthenticated? 
      (<Dropdown className="d-inline ">
        <Dropdown.Toggle variant='default text-white pr-5' id='dropdown-basic'>
        <span>{user?.name}</span>
        </Dropdown.Toggle>
        
        <DropdownMenu>
           {user?.role==='admin' && <Dropdown.Item
           onClick={dashboard} className="text-danger">Dashboard</Dropdown.Item>}
        
          <Dropdown.Item className="text-danger" onClick={logoutHandler}>Logout</Dropdown.Item>
          <Dropdown.Item className="text-dark" onClick={()=>{navigate('/praveen/myprofile')}}>Profile</Dropdown.Item>

        </DropdownMenu>
      </Dropdown>)
      :
      <Link to={'/loginUser'}><button className="btn" id="login_btn">Login</button></Link>
      }
      

      <Link to='/cart'><span id="cart" className="ml-3">Cart</span></Link>
      <span className="ml-1" id="cart_count">{user?.additems.length}</span>
    </div>
  </nav>
    )
}