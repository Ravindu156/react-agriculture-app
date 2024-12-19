import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './page/Home';
import About from './page/About';
import SignUp from './page/SignUp';
import Login from './page/Login';
import Menu from './page/Menu';
import Newproduct from './page/Newproduct';
import HomePage from './components/HomePage';
import Header from './components/Header';
import { useEffect } from "react";
import { setDataProduct } from "./redux/ProductSlide";
import { useDispatch, useSelector } from "react-redux";
import Cart from './page/Cart';
import { Toaster } from 'react-hot-toast';



function App() {
  const dispatch = useDispatch()
  const productData = useSelector((state)=>state.product)
 
  useEffect(()=>{
    (async()=>{
      const res = await fetch(`http://localhost:8080/product`)
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
       {/*  <Route path="/ecom/home" element={<Home />} /> */}
        <Route path="/ecom/about" element={<About />} />
        <Route path="/ecom/signup" element={<SignUp />} />
        <Route path="/ecom/header" element={<Header/>}/>
        <Route path="/ecom/login" element={<Login/>}/>
       {/*  <Route path="/ecom/menu" element={<Menu/>}/> */}
        <Route path="menu/:filterby" element={<Menu />} />
        <Route path="/ecom/newproduct" element={<Newproduct/>}/>
        <Route path='/ecom' element={<Home/>}/>
        <Route path="/ecom/cart" element={<Cart/>} />
      </Routes>
    </Router>
    </>
  )
  
}

export default App;