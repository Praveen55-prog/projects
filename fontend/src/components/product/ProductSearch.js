import { Fragment, useEffect } from "react";
import {useDispatch,useSelector} from "react-redux"
import { getProducts } from "../../actions/productsAction";
import Metadata from "../layout/Metadata";
import Loader from "../layout/Loader";
import Product from ".././product/Product";
import { toast } from "react-toastify";
import React from "react";
import { useParams } from "react-router-dom";

export default function ProductSearch(){
  const dispatch=useDispatch()
  const {keyword,low,high}=useParams()
  const {products,loading,error}=useSelector((state=>state.productsState))
  useEffect(()=>{
    if(error){
      return toast.error(error,{
        position:"bottom-center"
      })
    }

      
      dispatch(getProducts(keyword,low,high))
  },[dispatch,error,keyword,low,high])
  return(
  <Fragment>
    {loading?<Loader/>:
      <Fragment>
        {products && products.map((product)=>(
            <Metadata title={product?.name}/>

        ))}
      
      
    <h1 id="products_heading">Search Products</h1>
    

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