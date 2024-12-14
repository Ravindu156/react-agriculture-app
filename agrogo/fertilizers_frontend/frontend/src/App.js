//import logo from './logo.svg';
import './App.css';
//import Header from './components/Header';
//import { Outlet } from 'react-router-dom';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Dashboard from './components/dashboard/Dashboard';
import Register from './components/Register';
import Store from './components/page/Store';
import Seller from './components/page/Store/StoreCom/Seller';

function App() {
  return(
    <Router>
    <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path = "/register" element = {<Register/>}/>
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/Store" element={<Store />} />
    <Route path="/Seller" element={<Seller />} />
    </Routes>

    </Router>
  
  
  
/*  <div>
    <Header/>
    <main className='pt-16'>
      <Outlet/>
    </main>
  </div>*/
  


  );
}

export default App;
