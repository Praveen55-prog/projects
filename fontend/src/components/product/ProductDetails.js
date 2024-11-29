import { Fragment, useEffect, useState } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { getProduct } from "../../actions/productsAction";
import { useParams } from "react-router-dom";
import Loader from "../layout/Loader";
import { toast } from "react-toastify";
import Metadata from "../layout/Metadata";
import { itemadded } from "../../actions/authAction";

export default function ProductDetails(){  
    const dispatch=useDispatch()

    const {product,loading,error}=useSelector(state=>state.productState)
    const {user}=useSelector(state=>state.authState)
    const {id}=useParams()
    const [quantity,setQuantity]=useState(1)
    const increaseQty=()=>{
        const count=document.querySelector('.count')
        if(product.stock===0 || count.valueAsNumber>=product.stock)return
        const qty=count.valueAsNumber+1
        setQuantity(qty)
    }
    const decreaseQty=()=>{
        const count=document.querySelector('.count')
        if(count.valueAsNumber===1)return
        const qty=count.valueAsNumber-1
        setQuantity(qty)
    }

    const itemadd=()=>{

            const a=user && user?.additems.map(item=>item.description).includes(product.description)
            if(!a){
                return dispatch(itemadded(product?.description,product?.price,product?.image,product?.stock,quantity)),
                 toast.success("Product added to cart",{
                    position:"bottom-center",
                    autoClose:1000
                })
            }

            else{
                toast.error("Already this product added to cart",{
                    position:"bottom-center",
                    autoClose:2000
                })
            }

            
    }
    useEffect(()=>{
        if(error){
             return toast.error(error,{
                position:"bottom-center",
                autoClose:3000``
                
            }) 
        }
        dispatch(getProduct(id))
        
        
        
        
    },[dispatch,error,id])
    return(
        <Fragment>
            {loading?<Loader/>:
            <Fragment>
                <Metadata title={product?.name}/>
            <div className="container container-fluid">
            <div className="row f-flex justify-content-around">
            <div className="col-12 col-lg-5 img-fluid" id="product_image">
                <img src={product?.image} alt="sdf" height="500" width="500" />
            </div>

            <div className="col-12 col-lg-5 mt-5">
                <h3>{product?.name}</h3>
                <p id="product_id">{product?._id}</p>

                <hr/>

                <div className="rating-outer">
                    <div className="rating-inner" ></div>
                </div>
                <span id="no_of_reviews">(56 Reviews)</span>

                <hr/>

                <p id="product_price">Rs.{product?.price}</p>
                <div className="stockCounter d-inline">
                    <span className="btn btn-danger minus" onClick={decreaseQty}>-</span>

                    <input type="number" className="form-control count d-inline" value={quantity} readOnly />

                    <span className="btn btn-primary plus" onClick={increaseQty}>+</span>
                </div>
                
                 <button type="button" id="cart_btn" className="btn btn-primary d-inline ml-4" 
                 onClick={itemadd}
                 
                 disabled={product?.stock===0?true:false}>Add to Cart</button>

                <hr/>

                <p>Status: <span className={product?.stock>0?'greenColor':'redColor'}
                id="stock_status">{product?.stock!==0?"Stock in":"Out of Stock"}</span></p>

                <hr/>

                <h4 className="mt-2">Description:</h4>
                <p>{product?.description}</p>
                <hr/>
                <p id="product_seller mb-3">Sold by: <strong>{product?.seller}</strong></p>
				
				<button id="review_btn" type="button" className="btn btn-primary mt-4" data-toggle="modal" data-target="#ratingModal">
                            Submit Your Review
                </button>
				
				<div className="row mt-2 mb-5">
                    <div className="rating w-50">

                        <div className="modal fade" id="ratingModal" tabIndex="-1" role="dialog" aria-labelledby="ratingModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="ratingModalLabel">Submit Review</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">

                                        <ul className="stars" >
                                            <li className="star"><i className="fa fa-star"></i></li>
                                            <li className="star"><i className="fa fa-star"></i></li>
                                            <li className="star"><i className="fa fa-star"></i></li>
                                            <li className="star"><i className="fa fa-star"></i></li>
                                            <li className="star"><i className="fa fa-star"></i></li>
                                        </ul>

                                        <textarea name="review" id="review" className="form-control mt-3">

                                        </textarea>

                                        <button className="btn my-3 float-right review-btn px-4 text-white" data-dismiss="modal" aria-label="Close">Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
						
            </div>

        </div>

    </div>
    </div>
        </Fragment>}
        </Fragment>
    )
}