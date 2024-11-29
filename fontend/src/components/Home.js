import { Fragment, useEffect, useState } from "react";
import {useDispatch,useSelector} from "react-redux"
import { allproducts, getProducts } from "../actions/productsAction";
import Metadata from "./layout/Metadata";
import Loader from "./layout/Loader";
import Product from "./product/Product";
import { toast } from "react-toastify";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home(){
  const [low,setLow]=useState('')
  const [high,setHigh]=useState('')
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const {products,loading,error}=useSelector((state=>state.productsState))

  const priceHandler=(e)=>{
    e.preventDefault()
    navigate(`/${low}/${high}`)
    dispatch(getProducts(null,low,high))
  }
  useEffect(()=>{
    if(error){
      return toast.error(error,{
        position:"bottom-center"
      })
    }
    dispatch(getProducts(null,null,null))
    dispatch(allproducts())
    
  

  },[dispatch,error])
  return(
  <Fragment>
    {loading?<Loader/>:
      <Fragment>
      <Metadata title={"But Best products"} />
      <div className="navbar row">
         
    <h1 id="products_heading">Latest Products</h1>

<div className="">
  <form >
    <input type="text" placeholder="Enter Price range From"
    value={low} onChange={(e)=>setLow(e.target.value)}/>
    <input type="text" placeholder="Enter Price range To"
    value={high} onChange={(e)=>setHigh(e.target.value)}/>
    <button onClick={priceHandler}> Submit</button>
  </form>
</div>
      </div>
     
    

<section id="products" className="container mt-5">
  <div className="row">
    {products && products.map((product)=>(
      <Product product={product}/>
    ))}
    

  </div>
</section>
    </Fragment>}
  </Fragment>
  )
}