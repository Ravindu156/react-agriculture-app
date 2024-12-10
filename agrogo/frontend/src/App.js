import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Dashboard from './components/dashboard/Dashboard';
import Register from './components/Register';
//import CropApp from './components/CropCalendar/CropApp';


function App() {
  return(
<Router>
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path = "/register" element = {<Register/>}/>
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/cropcalendar" element={<CropApp/>}/> */}
      </Routes>
    </Router>
  )
  
}

export default App;