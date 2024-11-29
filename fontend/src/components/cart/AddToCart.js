import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../layout/Loader";
import { updateor } from "../../actions/authAction";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";



export default function AddToCart(){
    
    const dispatch=useDispatch()
    const navigate=useNavigate()
    
    
    const{user,loading}=useSelector(state=>state.authState)
    let total=0
    let ordered=0

    const increaseitem=(description,stock)=>{

        const a=user && user?.additems.map(item=>
            (item.description===description && stock!==0 && item.orderedStock<stock)?{
            ...item,orderedStock:item.orderedStock+1}:item,
            toast.error("Max Available Stock",{
                position:"bottom-center",
                autoClose:1000
            }),
            console.log(stock))
        dispatch(updateor(a))
        console.log(stock)
    }


    const decreaseitem=(description,stock)=>{

        const a=user && user?.additems.map(item=>
            (item.description===description && item.orderedStock>0 )?{
            ...item,orderedStock:item.orderedStock-1}:item,
            
            console.log(stock))
        dispatch(updateor(a))
        console.log(stock)
    }

        const deleteitem=(description)=>{
        

            const b=user && user?.additems.filter(item=>
                item.description!==description
            )
            dispatch(updateor(b))
            console.log(b)}      
            
    const checkoutHandler=()=>{
        navigate('/shipping')
    }

    
        return (

        <Fragment>
            {loading?<Loader/>:
                <Fragment>
            <div className="container container-fluid">
        <h2 className="mt-5">Your Cart: <b>{user?.additems.length} items</b></h2>
        
        <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8">
                <hr />
                {user && user.additems.map(item=>(
                    
                <div className="cart-item">
                <div className="row">
                    <div className="col-4 col-lg-3">
                        <img src={item?.image} alt="Laptop" height="90" width="115" />
                    </div>

                    <div className="col-5 col-lg-3">
                        <a href="javascript;">{item?.description}</a>
                    </div>


                    <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                        <p id="card_item_price">Rs.{item?.price}</p>
                    </div>

                    <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                        <div className="stockCounter d-inline" >
                            <span className="btn btn-danger minus" onClick={()=>decreaseitem(item.description,item.stock)}>-</span>
                            <input type="number" className="form-control count d-inline"  value={item.orderedStock}  />

                            <span className="btn btn-primary plus" 
                             key={item} onClick={()=>increaseitem(item.description,item.stock)} >+</span>
                        </div>
                    </div>

                    <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                        <i id="delete_cart_item" className="fa fa-trash btn btn-danger" key={item}
                        onClick={()=>deleteitem(item.description)}></i>
                    </div>

                </div>
            </div>
                ))}

                <hr />
            </div>

            <div className="col-12 col-lg-3 my-4">
                <div id="order_summary">
                    <h4>Order Summary</h4>                                                                                                                                                                                                      
                    <hr />
                    {user && user.additems.map(item=>
                       total+=item.price*item.orderedStock,
                       

                    )}
                    {user && user.additems.map(item=>
                       
                       ordered+=item.orderedStock

                    )}
                    <p>Subtotal:  <span className="order-summary-values">{ordered} (Units)</span></p>
                    <p>Est. total: <span className="order-summary-values">Rs.{total}</span></p>
    
                    <hr />
                    <button id="checkout_btn" className="btn btn-primary btn-block" 
                    onClick={checkoutHandler}>Check out</button>
                </div>
            </div>
        </div>
    </div>
        </Fragment>
}
        </Fragment>
      
    )
}