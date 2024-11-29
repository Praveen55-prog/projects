import axios from "axios"
import {cartitemFailure, cartitemRequest, cartitemSuccess } from "../slices/itemSlice"



export const cartitem=()=>async(dispatch)=>{
    try {
        dispatch(cartitemRequest())
        const {data}=await axios.get('/praveen/item')
        dispatch(cartitemSuccess(data))
    } catch (error) {
        dispatch(cartitemFailure())
        
    }
}