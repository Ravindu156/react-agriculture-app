import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './page/Home';

function App() {
  return(
<Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ecom/home" element={<Home />} />
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