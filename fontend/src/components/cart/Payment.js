import { Fragment, useState } from "react";
import CheckoutStep from "./CheckoutStep";
import { useNavigate } from "react-router-dom";

export default function Payment(){
    const [number,setNumber]=useState("")
    const [expiry,setExpiry]=useState("")
    const [cvc,setcvc]=useState("")
    const navigate=useNavigate()

    const submitHandler=()=>{
        navigate('/success')
    }
    return(
        <Fragment>
            <CheckoutStep shipping confirmorder payment />
                    <div class="row wrapper">
		<div class="col-10 col-lg-5">
            <form class="shadow-lg">
                <h1 class="mb-4">Card Info</h1>
                <div class="form-group">
                  <label for="card_num_field">Card Number</label>
                  <input
                    type="number"
                    id="card_num_field"
                    class="form-control"
                    value={number}
                    onChange={(e)=>setNumber(e.target.value)}
                  />
                </div>
				
				<div class="form-group">
                  <label for="card_exp_field">Card Expiry</label>
                  <input
                    type="text"
                    id="card_exp_field"
                    class="form-control"
                    value={expiry}
                    onChange={(e)=>setExpiry(e.target.value)}
                  />
                </div>
				
				<div class="form-group">
                  <label for="card_cvc_field">Card CVC</label>
                  <input
                    type="text"
                    id="card_cvc_field"
                    class="form-control"
                    value={cvc}
                    onChange={(e)=>setcvc(e.target.value)}
                  />
                </div>
      
            
                <button onClick={submitHandler}
                  id="pay_btn"
                  type="submit"
                  class="btn btn-block py-3"
                >
                  Pay
                </button>
    
              </form>
			  </div>
        </div>
        </Fragment>
    )
}