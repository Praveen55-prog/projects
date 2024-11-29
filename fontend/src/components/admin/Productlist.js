import { Fragment, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getadminprod } from "../../actions/productsAction"

import Sidebar from "./Sidebar";
import Loader from "../layout/Loader";
import {MDBDataTable} from 'mdbreact'

export default function Productlist(){
    const {products=[],loading=true}=useSelector(state=>state.productsState)
    const dispatch=useDispatch()

    const setProducts=()=>{
        const data={
            columns:[
                {
                    label:'ID',
                    field:'id',
                    sort:'asc'
                },
                {
                    label:'NAME',
                    field:'name',
                    sort:'asc'
                },
                {
                    label:'PRICE',
                    field:'price',
                    sort:'asc'
                },
                {
                    label:'STOCK',
                    field:'stock',
                    sort:'asc'
                },
                {
                    label:'ACTION',
                    field:'action',
                    sort:'asc'
                }

            ],
            rows:[]
        }
        products?.forEach(product=>{
            data?.rows.push({
                id:product?._id,
                name:product?.name,
                price:product?.price,
                stock:product?.stock,
                action:(
                    <Fragment>
                      
                        <Link to={`/praveen/product/${product?._id}`} className="btn btn-primary"> <i className="fa fa-pencil"></i></Link>
                        <Button className='btn btn-danger py-1 px-2 ml-2'> 
                            <i className="fa fa-trash"></i>
                        </Button>
                     </Fragment>
                )
            })
        })

        return data

    }

    useEffect(()=>{
        dispatch(getadminprod())
    },[dispatch])

    return(
        <div className="row">
            <div className="col-12 col-md-2">
                <Sidebar/>
            </div>
            <div className="col-12 col-md-10">
                <h1 className="my-4">Product List</h1>
                <Fragment>
                    {loading?
                        <Loader/>  :
                        <MDBDataTable 
                            data={setProducts()}
                            bordered
                            striped
                            hover
                            className='px-3'
                        /> 

                        

                    }
                </Fragment>
            </div>
        </div>
    )
}