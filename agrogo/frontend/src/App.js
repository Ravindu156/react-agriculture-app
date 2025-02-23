import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './page/Home';
import About from './page/About';
import SignUp from './page/SignUp';
import Login from './page/Login';
import Menu from './page/Menu';
import Newproduct from './page/Newproduct';
import Header from './components/Header';
import { useEffect } from "react";
import { setDataProduct } from "./redux/ProductSlide";
import { useDispatch, useSelector } from "react-redux";
import Cart from './page/Cart';
import { Toaster } from 'react-hot-toast';
import Login1 from './home/Login';
import HomePage from './home/HomePage';
import Register from './home/Register';
import Advisory from './home/Advisory';
import CropCalendar from'./components/cropcalendar/cropApp';
import Forgot_Password from './home/Forgot_Password';

import Store from './page/Store';
import Seller from './components/page/Store/StoreCom/Seller';
import Inorganic from'./components/page/Store/InorganicProducts'; 

import Contact from './page/Contact';
import Products from './components/Products';


import Dashboard from './components/dashboard/Dashboard';
import AdminDashboard from './components/dashboard/AdminDashboard';
import Profile from "./components/dashboard/Profile";


function App() {
  const dispatch = useDispatch()
  const productData = useSelector((state)=>state.product)
 
  useEffect(()=>{
    (async()=>{
      const res = await fetch(`http://localhost:5000/ecom/products/product`)
      const resData = await res.json()
      dispatch(setDataProduct(resData))
    })()
  },[])


  return(
    <>
      <Toaster/>
<Router>
 
       <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path = "/register" element = {<Register/>}/>
        <Route path = '/login' element = {<Login1/>}/>
        <Route path="/ecom/home" element={<Home />} /> 
        <Route path="/ecom/about" element={<About />} />
        <Route path="/ecom/signup" element={<SignUp />} />
        <Route path="/ecom/header" element={<Header/>}/>
        <Route path="/ecom/login" element={<Login/>}/>
        <Route path="/ecom/menu" element={<Menu/>}/> 
        <Route path="menu/:filterby" element={<Menu />} />
        <Route path="/ecom/newproduct" element={<Newproduct/>}/>
        <Route path='/ecom' element={<Home/>}/>
        <Route path="/ecom/cart" element={<Cart/>} />
        <Route path='/ecom/contact' element={<Contact/>}/>
        <Route path='/ecom/products' element={<Products/>}/>
        <Route path='/advisory' element={<Advisory/>}/>


     
      {/* <Route path="/" element={<HomePage />} />
      <Route path = "/register" element = {<Register/>}/>
      <Route path = '/login' element = {<Login1/>}/> */}
      

      {<Route path = '/login' element = {<Login/>}/> }
      <Route path = '/forgot' element = {<Forgot_Password/>}/>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/Store" element={<Store />} />
      <Route path="/Seller" element={<Seller />} />
      <Route path="/cropcalendar" element={<CropCalendar/>}/>
      <Route path="/Inorganic" element={<Inorganic />} />
      {/* <Route path="/Store" element={<Store />} />
      <Route path="/Seller" element={<Seller />} />
       */}

      
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/admindashboard" element={<AdminDashboard />} />
      
      <Route path="/profile" element={<Profile />} />


       {/* <Route path="/Store" element={<Store />} />
      <Route path="/Seller" element={<Seller />} />  */}


      <Route path="/cropcalendar" element={<CropCalendar/>}/>

      <Route path="/advisory" element={<Advisory />} />

      <Route path="/Store" element={<Store />} />
      <Route path="/Seller" element={<Seller />} />
     {/* <Route path="/Inorganic" element={<Inorganic />} /> */}



      </Routes>
    </Router>
    </>
  )
  
}

export default App;