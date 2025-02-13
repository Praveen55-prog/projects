import { Fragment, useEffect } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import {  getadminprod } from "../../actions/productsAction";
import { Link, useNavigate } from "react-router-dom";


export default function Dashboard(){

    const {products}=useSelector(state=>state.productsState)
    const dispatch=useDispatch()
    const navigate=useNavigate
    const productsdetails=()=>{
        navigate('/praveen/productlist')
    }

    let outofstock=0

    if(products?.length>0){
        products.forEach(product=>{
            if(product?.stock===0){
                outofstock=outofstock+1
            }
        })
    }

    useEffect(()=>{
        dispatch(getadminprod())
    },[dispatch])
    return (
        <Fragment>
                <div className="row">
                    <div className="col-12 col-md-2">
                        <Sidebar/>
                    </div>
                    <div className="col-12 col-md-10">
                        <h1 class="my-4">Dashboard</h1>
                            <div class="row pr-4">
                                <div class="col-xl-12 col-sm-12 mb-3">
                                    <div class="card text-white bg-primary o-hidden h-100">
                                        <div class="card-body">
                                            <div class="text-center card-font-size">Total Amount<br /> <b>$3425</b>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row pr-4">
                                <div class="col-xl-3 col-sm-6 mb-3">
                                    <div class="card text-white bg-success o-hidden h-100">
                                        <div class="card-body">
                                            <div class="text-center card-font-size">Products<br /> <b>{products?.length}</b></div>
                                        </div>
                                        <a class="card-footer text-white clearfix small z-1" >
                                            <span class="float-left text-white" > <Link to ={'/praveen/productlist'}>View Details</Link> </span>
                                            <span class="float-right">
                                                <i class="fa fa-angle-right" ><Link to ={'/praveen/productlist'}></Link></i>
                                            </span>
                                        </a>
                                    </div>
                                </div>


                                <div class="col-xl-3 col-sm-6 mb-3">
                                    <div class="card text-white bg-danger o-hidden h-100">
                                        <div class="card-body">
                                            <div class="text-center card-font-size">Orders<br /> <b>345</b></div>
                                        </div>
                                        <a class="card-footer text-white clearfix small z-1" to="/admin/orders">
                                            <span class="float-left">View Details</span>
                                            <span class="float-right">
                                                <i class="fa fa-angle-right"></i>
                                            </span>
                                        </a>
                                    </div>
                                </div>


                                <div class="col-xl-3 col-sm-6 mb-3">
                                    <div class="card text-white bg-info o-hidden h-100">
                                        <div class="card-body">
                                            <div class="text-center card-font-size">Users<br /> <b>55</b></div>
                                        </div>
                                        <a class="card-footer text-white clearfix small z-1" href="/admin/users">
                                            <span class="float-left" >View Details</span>
                                            <span class="float-right">
                                                <i class="fa fa-angle-right"></i>
                                            </span>
                                        </a>
                                    </div>
                                </div>


                                <div class="col-xl-3 col-sm-6 mb-3">
                                    <div class="card text-white bg-warning o-hidden h-100">
                                        <div class="card-body">
                                            <div class="text-center card-font-size">Out of Stock<br /> <b>{outofstock}</b></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
        </Fragment>
    )
}