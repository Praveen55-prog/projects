import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../../actions/authAction";
import { toast } from "react-toastify";

export default function UpdatePassword(){
    const [oldpassword,setOldPassword]=useState('')
    const [newpassword,setNewPassword]=useState('')
    const {isUpdated}=useSelector(state=>state.authState)
    const dispatch=useDispatch()
    const passwordHandler=(e)=>{
        e.preventDefault()
        dispatch(updatePassword(oldpassword,newpassword))

    }

    useEffect(()=>{
        if(isUpdated){
            toast.success("Password Updated Succeffully",{
                position:"bottom-center",
                autoClose:2000
            })
        }


    },[isUpdated])
    
    return(
        <Fragment>
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={passwordHandler}>
                        <h1 className="mt-2 mb-5">Update Password</h1>
                        <div className="form-group">
                            <label htmlFor="old_password_field">Old Password</label>
                            <input
                                type="password"
                                id="old_password_field"
                                className="form-control"
                                value={oldpassword}
                                onChange={(e)=>setOldPassword(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="new_password_field">New Password</label>
                            <input
                                type="password"
                                id="new_password_field"
                                className="form-control"
                                value={newpassword}
                                onChange={(e)=>setNewPassword(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="btn update-btn btn-block mt-4 mb-3">Update Password</button>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}