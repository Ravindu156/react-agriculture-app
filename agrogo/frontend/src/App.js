import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './page/Home';
import About from './page/About';
import SignUp from './page/SignUp';
import Login from './page/login';
import Menu from './page/Menu';
import Newproduct from './page/Newproduct';
import HomePage from './components/HomePage';
import Header from './components/Header';



function App() {
  return(
<Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
       {/*  <Route path="/ecom/home" element={<Home />} /> */}
        <Route path="/ecom/about" element={<About />} />
        <Route path="/ecom/signup" element={<SignUp />} />
        <Route path="/ecom/header" element={<Header/>}/>
        <Route path="/ecom/login" element={<Login/>}/>
        <Route path="/ecom/menu" element={<Menu/>}/>
        <Route path="/ecom/newproduct" element={<Newproduct/>}/>
        <Route path='/ecom' element={<Home/>}/>
      </Routes>
    </Router>
  )
  
}

export default App;