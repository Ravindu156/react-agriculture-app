import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Dashboard from './components/dashboard/Dashboard';
import Register from './components/Register';
import Store from './components/page/Store';
import Seller from './components/page/Store/StoreCom/Seller';
import CropApp from './components/CropCalendar/CropApp';
import Login from './components/Login';


function App() {
  return(
<Router>
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path = "/register" element = {<Register/>}/>
      <Route path = '/login' element = {<Login/>}/>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/Store" element={<Store />} />
      <Route path="/Seller" element={<Seller />} />
      <Route path="/cropcalendar" element={<CropApp/>}/>
      </Routes>
  
  </Router>
  
)};

export default App;
