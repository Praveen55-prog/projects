import { createSlice } from "@reduxjs/toolkit";

const productsSlice=createSlice({
    name:"products",
    initialState:{
        loading:false
    },
    reducers:{
        productsRequests(state,action){
            return{
                    loading:true
            }
        },
        productsSuccess(state,action){
            return{
                loading:false,
                products:action.payload.products
            }
        },
        productsFail(state,action){
            return{
                loading:false,
                error:action.payload
                
            }
        },
        getadminproductsrequest(state,action){
            return{
                    loading:true
                    
            }
        },
        getadminproductssuccess(state,action){
            return{
                loading:false,
                products:action.payload.products
            }
        },
        getadminproductsfailure(state,action){
            return{
                loading:false,
                error:action.payload,
                
                
            }
        }
    }
    

})

const {actions,reducer}=productsSlice
export const {productsRequests,productsSuccess,productsFail,
    getadminproductsfailure,getadminproductsrequest,getadminproductssuccess}=actions
export default reducer