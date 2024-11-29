import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../actions/authAction";
import { toast } from "react-toastify";

export default function UpdateProfile(){
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const {user,isUpdated}=useSelector(state=>state.authState)
    const dispatch=useDispatch()
    const profileHandler=(e)=>{
        e.preventDefault()
        dispatch(updateProfile(name,email))
    }

    useEffect(()=>{
        if(isUpdated){
            toast.success("Profile Updated Successfully",{
                type:"success",
                position:"bottom-center",
                autoClose:2000
            }
            )
            return
        }
        setName(user?.name)
        setEmail(user?.email)
    },[user,isUpdated])
    return(
        <Fragment>
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" encType='multipart/form-data'
                        onSubmit={profileHandler}>
                        <h1 className="mt-2 mb-5">Update Profile</h1>

                        <div className="form-group">
                            <label htmlFor="email_field">Name</label>
                            <input 
								type="name" 
								id="name_field" 
								className="form-control"
                                name='name'
                                value={name}
                                onChange={(e)=>setName(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email_field">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                name='email'
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                            />
                        </div>

                        <div className='form-group'>
                            <label htmlFor='avatar_upload'>Avatar</label>
                            <div className='d-flex align-items-center'>
                                <div>
                                    <figure className='avatar mr-3 item-rtl'>
                                        <img
                                            src='./images/profile.jpg'
                                            className='rounded-circle'
                                            alt='Avatar Preview'
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

                        <button type="submit" className="btn update-btn btn-block mt-4 mb-3" >Update</button>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}