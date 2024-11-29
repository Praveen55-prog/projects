import './App.css';
import Home from './components/Home';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom' 
import {HelmetProvider} from 'react-helmet-async'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import ProductDetails from './components/product/ProductDetails';
import ProductSearch from './components/product/ProductSearch';
import Login from './components/user/Login';
import Register from './components/user/Register';
import { useEffect } from 'react';
import store from './store'
import { loadUser } from './actions/authAction';
import Profile from './components/user/Profile';
import ProtectedRoute from './components/route/ProtectedRoute';
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import AddToCart from './components/cart/AddToCart';
import Shippinginfo from './components/cart/Shippinginfo';
import CheckoutStep from './components/cart/CheckoutStep';
import ConfirmOrder from './components/cart/ConfirmOrder';
import Payment from './components/cart/Payment';
import Succcess from './components/cart/Succcess';
import Updateuser from './components/user/Updateuser';
import Dashboard from './components/admin/Dashboard';
import Productlist from './components/admin/Productlist';
import Userlist from './components/admin/Userlist';



function App() {
  useEffect(()=>{
    store.dispatch(loadUser)
  })

  
  return (
    <Router>
    
    <div className="App"> 
      <HelmetProvider>
    <Header/>
    <div>
    <ToastContainer theme='dark'/>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/loginUser' element={<Login/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/praveen/updateprofile' element={<UpdateProfile/>}></Route>
      <Route path='/praveen/changepassword' element={<UpdatePassword/>}></Route>
      <Route path='/praveen/myprofile' element={<ProtectedRoute><Profile/></ProtectedRoute>}></Route>
      <Route path='/praveen/product/:id' element={<ProductDetails/>}></Route>
      <Route path='/search/:keyword' element={<ProductSearch/>}></Route>
      <Route path='/:low/:high' element={<ProductSearch/>}></Route>
      <Route path='/steps' element={<CheckoutStep/>}></Route>

      <Route path='/cart' element={<AddToCart/>}></Route>
      <Route path='/confirmorder' element={<ConfirmOrder/>}></Route>
      <Route path='/payment' element={<Payment/>}></Route>
      <Route path='/success' element={<Succcess/>}></Route>
      <Route path='/praveen/changeuserrole' element={<Updateuser/>}></Route>
      <Route path='/praveen/productlist' element={<Productlist/>}></Route>
      <Route path='/praveen/userlist' element={<Userlist/>}></Route>
      

      <Route path='/praveen/dashboard' element={<ProtectedRoute isAdmin={true}><Dashboard/></ProtectedRoute>}></Route>

      
      <Route path='/shipping' element={<ProtectedRoute><Shippinginfo/></ProtectedRoute>}></Route>
    
    </Routes>

    </div>
   
    
    <Footer />
    </HelmetProvider>
    </div></Router>
      
  );
}

export default App;
