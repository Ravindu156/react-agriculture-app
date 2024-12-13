import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
//import reportWebVitals from './reportWebVitals';

 /*import {createBrowserRouter,
  createRoutesFromElements,
  Route,
 RouterProvider} from "react-router-dom";

import Home from './components/page/Home';
  import Menu from './components/page/Menu';
  import About from './components/page/About';
  import Contact from './components/page/Contact';
  import Login from './components/page/Login';
  import Newproduct from './components/page/Newproduct';
*/
  

/*const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route index element={<Home/>}/>
      <Route path="menu" element={<Menu/>}/>
      <Route path="about" element={<About/>}/>
      <Route path="contact" element={<Contact/>}/>
      <Route path="login" element={<Login/>}/>
      <Route path="newproduct" element={<Newproduct />} />
  )
<<<<<<< HEAD


)
)
*/

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    
  </React.StrictMode>
);
//reportWebVitals();