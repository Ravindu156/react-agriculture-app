import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import {dotenv} from 'dotenv'

import { store } from "./redux/index";
import { Provider } from "react-redux";
// import {createBrowserRouter,
//   createRoutesFromElements,
//   Router, Routes,
//   Route,
//  RouterProvider} from "react-router-dom";

//  import Home from './components/page/Home';
//   import Menu from './components/page/Menu';
//   import About from './components/page/About';
//   import Contact from './components/page/Contact';
//   import Login from './components/page/Login';
//   import Newproduct from './components/page/Newproduct';

  

// const router=createBrowserRouter(
//   createRoutesFromElements(
//     <Routes>
//       <Route path='/' element={<App/>}/>
//       <Route index element={<Home/>}/>
//       <Route path="menu" element={<Menu/>}/>
//       <Route path="about" element={<About/>}/>
//       <Route path="contact" element={<Contact/>}/>
//       <Route path="login" element={<Login/>}/>
//       <Route path="newproduct" element={<Newproduct />} />
     
//      <React.StrictMode>
//     <App />
//   </React.StrictMode>
//   </Routes>


//   )


// )
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <Provider store={store}>
    <App />
  </Provider>,
   document.getElementById('root')
  );
