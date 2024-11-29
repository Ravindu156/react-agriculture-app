import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Router,
} from "react-router-dom";
// import {createBrowserRouter,
//   createRoutesFromElements,
//   Router, Routes,
//   Route,
//  RouterProvider} from "react-router-dom";



  

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
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      {/* <Route path="menu" element={<Menu />} /> */}
      <Route path="menu/:filterby" element={<Menu />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="login" element={<Login />} />
      <Route path="newproduct" element={<Newproduct />} />
      <Route path="signup" element={<Signup />} />
      <Route path="cart" element={<Cart />} />
      <Route path="success" element={<Success/>}/>
      <Route path="cancel" element={<Cancel/>}/>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
  
);
