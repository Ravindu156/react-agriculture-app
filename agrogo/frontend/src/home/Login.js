import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Image from '../Images/Reg (2).jpg';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 

export default function Login () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post('http://localhost:5000/api/users/login/', { email, password });
  //     localStorage.setItem('token', response.data.token);
  //     navigate('/dashboard'); 
  //   } catch (error) {
  //     setError(error.response?.data?.message || 'Login failed');
  //     if (error.response && error.response.data && error.response.data.message) {
  //       setError(error.response.data.message); 
  //     }
    
  //   }
  // };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Send login credentials to the backend
      const response = await axios.post('http://localhost:5000/api/users/login/', { email, password });
  
      // Extract token and user details from the response
      const { token, user } = response.data;
  
      // Store token and user details in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
  
      // Redirect to the dashboard
      navigate('/dashboard'); 
      
    } catch (error) {
      // Handle errors and display appropriate messages
      const errorMessage = error.response?.data?.message || 'Login failed';
      setError(errorMessage); 
    }
    if (email === 'admin@gmail.com' && password === 'User@1234') {
      navigate('/admindashboard');
    } 
  };
  

  return (
    <div className="flex min-h-screen">
        <div className="w-4/5 hidden lg:block">
        <img 
          src={Image} 
          alt="Login Background" 
          className="w-full h-full object-cover" 
        />
      </div>
    <div className="w-1/2 flex justify-center items-center bg-yellow-100">
      <div className="w-3/4 max-w-md p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-semibold text-green-600 text-center">AgroGo</h1>
        <h2 className="text-lg text-gray-700 text-center mt-2">Log in to your account</h2>
        
        {error && <p className="text-red-600 text-center mt-4">{error}</p>}
      
      <form onSubmit={handleLogin} className="mt-8 space-y-4">
        <div>
          <label htmlFor="email" className="block text-gray-700">Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            className="w-full p-3 mt-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="relative"> 
          <label htmlFor="password" className="block text-gray-700">Password:</label>
          <input 
             type={isPasswordVisible ? 'text' : 'password'} 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            className="w-full p-3 mt-2 border border-gray-300 rounded-md"
          />
          <span
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                className="absolute right-4 top-2/3 transform -translate-y-1/2 cursor-pointer"
              >
                {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
              </span>
        </div>
        <button type="submit" className="w-full p-3 mt-4 bg-green-600 text-white rounded-md hover:bg-green-700">Login</button>
      </form>
      <div>
  <a
    className="text-stone-500 hover:text-blue-700 cursor-pointer"
    style={{ cursor: "pointer" }}
    onClick={async() => {
      if (!email) {
        alert("Please provide an email address before proceeding.");
        return;
      }
      
      try {
        // Check if the email exists in the database
        const response = await axios.post('http://localhost:5000/api/users/check-email', { email });
        
        // If email exists, navigate to forgot password page
        navigate('/forgot', { state: { email } });
      } catch (error) {
        // If email doesn't exist or there's an error
        alert("This email is not registered in our system.");
      }
    }}
  >
    Forgot password
  </a>
</div>

    </div>
    </div>
    </div>
  );
};

