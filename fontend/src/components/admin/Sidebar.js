import { Fragment } from "react";
import { Link } from "react-router-dom";
import { Dropdown, DropdownMenu } from "react-bootstrap";

export default function Sidebar(){
    return(
        <Fragment>
            <div className="sidebar-wrapper">
                <nav id="sidebar">
                    <ul className="list-unstyled components">
                    <li>
                        <Link to ='/praveen/dashboard'><i className="fas fa-tachometer-alt"></i> Dashboard</Link>
                    </li>
            
                    <li>

                        <Dropdown className="d-inline"> 
                            <Dropdown.Toggle variant='default text-white pr-5' id='dropdown-basic'>
                            Products
                            </Dropdown.Toggle>
                            <DropdownMenu>
                                 <Dropdown.Item className="text-warning"><Link to='/praveen/productlist'>All</Link></Dropdown.Item> 
                                <Dropdown.Item className="text-warning">Create</Dropdown.Item>
                            </DropdownMenu>

                        </Dropdown>
                        
                      
                    </li>

                    <li>
                        <a href="#"><i className="fas fa-shopping-basket"></i> Orders</a>
                    </li>

                    <li>
                    <Link to={'/praveen/userlist'}><i className="fas fa-users">Users</i> </Link>
                    </li>
            
                </ul>
                </nav>
            </div>
            </Fragment>
        
    )
}