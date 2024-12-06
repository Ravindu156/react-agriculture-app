import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Dashboard from './components/dashboard/Dashboard';
import Register from './components/Register';
import Store from './components/page/Store';

function App() {
  return(
<Router>
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path = "/register" element = {<Register/>}/>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/store" element={<Store />} />
      </Routes>
    </Router>
  )
  
}

export default App;