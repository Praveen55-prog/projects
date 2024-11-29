import axios from "axios"
import { loadUserFailure, loadUserRequest, loadUserSuccess, loginFailure, loginRequest, 
    loginSuccess, logoutFailure, logoutSuccess, registerFailure, registerRequest, 
    registerSuccess, 
    updatePasswordFailure, 
    updatePasswordRequest, 
    updatePasswordSuccess, 
    updateProfileFailure, 
    updateProfileRequest,
    updateProfileSuccess,
    additemFailure,
    additemRequest,additemSuccess,
    stockAddRequest,
    stockAddSuccess,
    stockAddFailure,
    shippingInfoRequest,
    shippingInfoSuccess,
    shippingInfoFailure,
    clearError,
    updateuserrequest,
    updateusersuceess,
    updateuserfailure,
    allusersrequest,
    alluserssuccess,
    allusersfailure} from "../slices/authSlice"





export const loginuser=(email,password)=>async(dispatch)=>{
  
    try {
        dispatch(loginRequest())
        const {data}=await axios.post('/praveen/loginUser',{email,password})
        dispatch(loginSuccess(data))
    } catch (error) {
        if (error.response?.data?.message==='jwt expired'){
            console.error('Token Expired.Redirected to login')
            
        }
        dispatch(loginFailure(error.response.data.message))
        
    }
}

export const registeruser=(name,email,password)=>async(dispatch)=>{
    try {
        dispatch(registerRequest())
        const {data}=await axios.post('/praveen/register',{name,email,password})
        dispatch(registerSuccess(data))
        console.log("regstered")
    } catch (error) {
        dispatch(registerFailure(error.response.data.message))
        
    }
}

export const loadUser=async(dispatch)=>{
    try {
        dispatch(loadUserRequest())
        const {data}=await axios.get('/praveen/myprofile')
        dispatch(loadUserSuccess(data))
    } catch (error) {
        dispatch(loadUserFailure(error.response.data.message))
        
    }
}

export const logout=async(dispatch)=>{
    try {
        
        await axios.get('/praveen/logout')
        dispatch(logoutSuccess())
    } catch (error) {
        dispatch(logoutFailure())
        
    }
}

export const updateProfile=(name,email)=>async(dispatch)=>{
    try {
        dispatch(updateProfileRequest())        
        const {data}=await axios.put('/praveen/updateprofile',{name,email})
        dispatch(updateProfileSuccess(data))
    } catch (error) {
        dispatch(updateProfileFailure(error.response.data.message))
        
    }
}

export const updatePassword=(oldpassword,newpassword)=>async(dispatch)=>{
    try {
        dispatch(updatePasswordRequest())        
        const {data}=await axios.put('/praveen/changepassword',{oldpassword,newpassword})
        dispatch(updatePasswordSuccess(data))
    } catch (error) {
        dispatch(updatePasswordFailure(error.response.data.message))
        
    }
}

export const itemadded=(description,price,image,stock,orderedStock)=>async(dispatch)=>{
    try {
        dispatch(additemRequest())
        const {data}=await axios.put('/praveen/additem',{description,price,image,stock,orderedStock})
        dispatch(additemSuccess(data))
    } catch (error) {
        dispatch(additemFailure())
        
    }
}
export const updateor=(additems)=>async(dispatch)=>{
    try {
        dispatch(stockAddRequest())        
        const {data}=await axios.put('/praveen/updateorder',{additems})
        dispatch(stockAddSuccess(data))
    } catch (error) {
        dispatch(stockAddFailure(error.response.data.message))
        
    }
}

export const ShippingInfo =(address,city,phoneNumber,postal,country,state)=>async(disptach)=>{
    try {
        disptach(shippingInfoRequest())
        const {data}=await axios.put('/praveen/shipping',{address,city,phoneNumber,postal,country,state})
        disptach(shippingInfoSuccess(data))
    } catch (error) {
        disptach(shippingInfoFailure(error.response.data.message))
        
    }
}

export const clearAuthError=(dispatch)=>{
    dispatch(clearError())
}

export const updaterole=(name,email,role)=>async(dispatch)=>{
    try {
        dispatch(updateuserrequest())        
        const {data}=await axios.put('/praveen/changeuserrole',{name,email,role})
        dispatch(updateusersuceess(data))
    } catch (error) {
        dispatch(updateuserfailure(error.response.data.message))
        
    }
}

export const allusers=()=>async(dispatch)=>{
    try {
        dispatch(allusersrequest())
        const {data}=await axios.get('/praveen/allusers')
        dispatch(alluserssuccess(data))
    } catch (error) {
        dispatch(allusersfailure())
        
    }
}


