import {configureStore,combineReducers} from '@reduxjs/toolkit'

import { thunk } from 'redux-thunk'
import productsReducer from './slices/productsSlice'
import productReducer from './slices/productSlice'
import authReducer from './slices/authSlice'
import itemReducer from './slices/itemSlice'
const reducer=combineReducers({
    productsState:productsReducer,
    productState:productReducer,
    authState:authReducer,
    itemState:itemReducer


})

const store=configureStore({
    reducer,
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(thunk)
})

export default store