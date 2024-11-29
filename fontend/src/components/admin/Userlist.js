import { MDBDataTable } from "mdbreact";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";
import { allusers } from "../../actions/authAction";

export  default function Userlist(){
    const {users=[],loading=true}=useSelector(state=>state.authState)
    const dispatch=useDispatch()

    const setUsers=()=>{
        const data={
            columns:[
                {
                    label:'NAME',
                    field:'name',
                    sort:'asc'
                },
                {
                    label:'EMAIL ID',
                    field:'emailid',
                    sort:'asc'
                },
                {
                    label:'ROLE',
                    field:'role',
                    sort:'asc'
                }
            ],
            rows:[]
        }

        users.forEach(user=>{
            data?.rows.push({
                name:user?.name,
                emailid:user?.email,
                role:user?.role
            })
        })
        return data
    }

    useEffect(()=>{
        dispatch(allusers())
    },[dispatch])
    return(
        <Fragment>
            <div className="row">
            <div className="col-12 col-md-2">
                <Sidebar/>
            </div>
            <div className="col-12 col-md-10">
                <h1 className="my-4">User List</h1>
                <Fragment>
                    {loading?
                        <Loader/>  :
                        <MDBDataTable
                            data={setUsers()}
                            bordered
                            striped
                            hover
                            className='px-3'
                        /> 

                        

                    }
                </Fragment>
            </div>
        </div>
            
        </Fragment>
    )
}