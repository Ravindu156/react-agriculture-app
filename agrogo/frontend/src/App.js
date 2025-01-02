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
import Dashboard from './components/dashboard/Dashboard';
import Register from './home/Register';
import CropCalendar from'./components/cropcalendar/cropApp';
//<<<<<<< HEAD
import Store from './page/Store';
import Seller from './components/page/Store/StoreCom/Seller';
import Inorganic from'./components/page/Store/InorganicProducts'; 
//=======
//import Store from './components/page/Store';
//import Seller from './components/page/Store/StoreCom/Seller';
//import Inorganic from'./components/page/Store/InorganicProducts'; 
//>>>>>>> 657509e79cbd622d0d965a73d012f512355007cb




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
      </Routes> 


      <Routes>

      <Route path="/" element={<HomePage />} />
      <Route path = "/register" element = {<Register/>}/>
      <Route path = '/login' element = {<Login1/>}/>
      
      {<Route path = '/login' element = {<Login/>}/> }
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/Store" element={<Store />} />
      <Route path="/Seller" element={<Seller />} />
      <Route path="/cropcalendar" element={<CropCalendar/>}/>
      <Route path="/Inorganic" element={<Inorganic />} />
      {/* <Route path="/Store" element={<Store />} />
      <Route path="/Seller" element={<Seller />} />
       */}
      </Routes>
    </Router>
    </>
  )
  
}

export default App;