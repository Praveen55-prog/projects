import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {countries} from 'countries-list'
import { ShippingInfo } from "../../actions/authAction";
import { useNavigate } from "react-router-dom";
import CheckoutStep from "./CheckoutStep";
import { toast } from "react-toastify";




export default function Shippinginfo(){
    const {user}=useSelector(state=>state.authState)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const [address,setAddress]=useState(user?.Shippinginfo[0]?.address)
    const [city,setCity]=useState(user?.Shippinginfo[0]?.city)
    const [phoneNumber,setPhoneNum]=useState(user?.Shippinginfo[0]?.phoneNumber)
    const [postal,setPostal]=useState(user?.Shippinginfo[0]?.postal)
    const [country,setCountry]=useState(user?.Shippinginfo[0]?.country)
    const [state,setState]=useState(user?.Shippinginfo[0]?.state)
    const countrieslist=Object.values(countries)

    const submitHandler=(e)=>{
        e.preventDefault()

        if(!address || !city || !phoneNumber || !postal || !country || !state){
            
            toast.error("Please fill all the details",{
                position:"bottom-center",
                autoClose:1000
            },
        navigate('/shipping'))
        

    }else{
    

    }
        dispatch(ShippingInfo(address,city,phoneNumber,postal,country,state))
        navigate('/confirmorder')
        

        
        
    }
    return(
        <Fragment>
            <CheckoutStep shipping />
            
        <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" >
                        <h1 className="mb-4">Shipping Info</h1>
                        <div className="form-group">
                            <label htmlFor="address_field">Address</label>
                            <input
                                type="text"
                                id="address_field"
                                className="form-control"
                                value={address}
                                onChange={(e)=>setAddress(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="city_field">City</label>
                            <input
                                type="text"
                                id="city_field"
                                className="form-control"
                                value={city}
                                onChange={(e)=>setCity(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlhtmlFor="phone_field">Phone No</label>
                            <input
                                type="phone"
                                id="phone_field"
                                className="form-control"
                                value={phoneNumber}
                                onChange={(e)=>setPhoneNum(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="postal_code_field">Postal Code</label>
                            <input
                                type="number"
                                id="postal_code_field"
                                className="form-control"
                                value={postal}
                                onChange={(e)=>setPostal(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="country_field">Country</label>
                            <select
                                id="country_field"
                                className="form-control"
                                value={country}
                                onChange={(e)=>setCountry(e.target.value)}
                                required
                            >
                                {countrieslist.map((country,i)=>(
                                    <option key={i} value={country.name}>
                                    {country.name}
                                </option>
                                ))}

                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="postal_code_field">State</label>
                            <input
                                type="text"
                                id="postal_code_field"
                                className="form-control"
                                value={state}
                                onChange={(e)=>setState(e.target.value)}
                                required
                            />
                        </div>


                        <button
                            id="shipping_btn" onClick={submitHandler}
                            type="submit"
                            className="btn btn-block py-3"
                        >
                            CONTINUE
                            </button>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}