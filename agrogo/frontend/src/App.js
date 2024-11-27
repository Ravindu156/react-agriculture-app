import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import About from './components/page/About';
import SignUp from './components/page/SignUp';

function App() {
  return(
<Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ecom/about" element={<About />} />
        <Route path="/ecom/signup" element={<SignUp />} />
      </Routes>
    </Router>
  )
  
}

export default App;