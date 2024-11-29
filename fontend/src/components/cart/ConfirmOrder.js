import { Fragment } from "react";
import CheckoutStep from "./CheckoutStep";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function ConfirmOrder(){

    const {user}=useSelector(state=>state.authState)
    let st=0
    let sp=200
    return(
        <Fragment>
            <CheckoutStep shipping confirmorder/>
            <div className="container container-fluid">
        
        <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8 mt-5 order-confirm">

                <h4 className="mb-3">Shipping Info</h4>
                <p><b>Name:</b> {user?.name}</p>
                <p><b>Phone:</b>{user?.Shippinginfo[0].phoneNumber}</p>
                <p className="mb-4"><b>Address:</b> {user?.Shippinginfo[0].address},{user?.Shippinginfo[0].city},{user?.Shippinginfo[0].state},{user?.Shippinginfo[0].country} </p>
                
                <hr />
                <h4 className="mt-4">Your Cart Items:</h4>

                <hr />
                <div className="cart-item my-1">
                {
                            user && user.additems.map(item=>(
                                <div className="row">
                        
                                <div className="col-4 col-lg-2">
                                    <img src={item.image} alt="Laptop" height="45" width="65" />
                                </div>
        
                                <div className="col-5 col-lg-6">
                                    <a href="#">{item.description}</a>
                                </div>
        
        
                                <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                                    <p>{item.orderedStock} x {item.price} = <b>Rs.{item.orderedStock*item.price}</b></p>
                                </div>
        
                            </div>            
                            ))
                        }
                    
                </div>
                <hr />

            </div>
			
			<div className="col-12 col-lg-3 my-4">
                    <div id="order_summary">
                        <h4>Order Summary</h4>
                        <hr />
                        {
                            user && user.additems.map(item=>(
                                st+=item.orderedStock*item.price
                            ))
                        }
                        <p>Subtotal:  <span className="order-summary-values">{st}</span></p>
                        <p>Shipping: <span className="order-summary-values">{sp}</span></p>
                        <p>Tax:  <span className="order-summary-values">{st*0.05}</span></p>

                        <hr />

                        <p>Total: <span className="order-summary-values">{st+sp+st*0.05}</span></p>

                        <hr />
                        <Link to='/payment'>
                        <button id="checkout_btn" className="btn btn-primary btn-block">Proceed to Payment</button></Link>
                        
                    </div>
                </div>
			
			
        </div>
    </div>
        </Fragment>
    )
}