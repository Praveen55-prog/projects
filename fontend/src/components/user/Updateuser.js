import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updaterole } from "../../actions/authAction";
import { toast } from "react-toastify";
import { clearError } from "../../slices/authSlice";


export default function Updateuser(){

    const {user}=useSelector(state=>state.authState)

    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [role,setRole]=useState('')
    const dispatch=useDispatch()

    const changeuserrole=(e)=>{
        e.preventDefault()
        dispatch(updaterole(name,email,role))

        toast.success("Updated user Profile",{
            position:'bottom-center',
            onOpen:()=>(dispatch(clearError))
        })


    }

    useEffect(()=>{
        setName(user?.name)
        setEmail(user?.email)
        setRole(user?.role)
    },[dispatch,user])
    return(
        <Fragment>
            <div class="row wrapper">
                <div class="col-10 col-lg-5">
                    <form class="shadow-lg" onSubmit={changeuserrole}>
                        <h1 class="mt-2 mb-5">Update User</h1>

                        <div class="form-group">
                            <label for="name_field">Name</label>
                            <input 
								type="name" 
								id="name_field" 
								class="form-control"
                                name='name'
                                value={name}
                                onChange={(e)=>setName(e.target.value)}
                            />
                        </div>

                        <div class="form-group">
                            <label for="email_field">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                class="form-control"
                                name='email'
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                            />
                        </div>

                        <div class="form-group">
                                    <label for="role_field">Role</label>

                                    <select
                                        id="role_field"
                                        class="form-control"
                                        name='role'
                                        value={role}
                                        onChange={(e)=>setRole(e.target.value)}
                                    >
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </div>

                        <button type="submit" class="btn update-btn btn-block mt-4 mb-3" >Update</button>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}