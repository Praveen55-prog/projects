import { Fragment } from "react";
import { Link } from "react-router-dom";

export default function CheckoutStep({shipping,confirmorder,payment}){
    return(
        <Fragment>
  <div className="checkout-progress d-flex justify-content-center mt-5">

    {
        shipping?
            <Link to= "/shipping">
                <div className="triangle2-active"></div>
        <div className="step active-step">ShippingInfo</div>
        <div className="triangle-active"></div>
        
        </Link>:
          <Link to= "/shipping">
          <div className="triangle2-incomplete"></div>
          <div className="step incomplete">ShippingInfo</div>
          <div className="triangle-incomplete"></div>
      </Link>
      
    }

{
        confirmorder?
            <Link to= "/confirmorder">
                <div className="triangle2-active"></div>
        <div className="step active-step">ConfirmOrder</div>
        <div className="triangle-active"></div>
        
        </Link>:
          <Link to= "/confirmorder">
          <div className="triangle2-incomplete"></div>
          <div className="step incomplete">ConfirmOrder</div>
          <div className="triangle-incomplete"></div>
      </Link>
      
    }
    {
        payment?
            <Link >
                <div className="triangle2-active"></div>
        <div className="step active-step">Payment</div>
        <div className="triangle-active"></div>
        
        </Link>:
          <Link to= "/shipping">
          <div className="triangle2-incomplete"></div>
          <div className="step incomplete">Payment</div>
          <div className="triangle-incomplete"></div>
      </Link>
      
    }
        

       
      </div>
        </Fragment>
    )
}