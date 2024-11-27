import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import About from './components/page/About';
import SignUp from './components/page/SignUp';
import Header from './components/Header';
import Login from './components/page/Login';
import Newproduct from './components/page/Newproduct';

function App() {
  return(
<Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ecom/about" element={<About />} />
        <Route path="/ecom/signup" element={<SignUp />} />
        <Route path="/ecom/header" element={<Header/>}/>
        <Route path="/ecom/login" element={<Login/>}/>
        <Route path="/ecom/newproduct" element={<Newproduct/>}/>
        <Route path="/ecom/newproduct" element={<Newproduct/>}/>
      </Routes>
    </Router>
  )
  
}

export default App;