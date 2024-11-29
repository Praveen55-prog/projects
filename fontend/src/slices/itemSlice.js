import { createSlice } from "@reduxjs/toolkit";

const itemSlice=createSlice({
    name:"items",
    initialState:{
        loading:false
    },
    reducers:{
        
        cartitemRequest(state,action){
            return{
                loading:true
            }
        },
        cartitemSuccess(state,action){
            return{
                loading:false,
                items:action.payload.items
            }
        },
        cartitemFailure(state,action){
            return{
                loading:false,
                error:action.payload
            }
        }
    }})

const {actions,reducer}=itemSlice

export const {cartitemRequest,cartitemSuccess,cartitemFailure
}=actions
export default reducer