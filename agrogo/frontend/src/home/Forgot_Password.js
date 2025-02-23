import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate ,useLocation} from 'react-router-dom';
import Image from '../Images/Reg (2).jpg';

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve email from passed state
  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
    }
  }, [location.state]);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/reset-password', { 
        email, newPassword, confirmPassword 
      });
      setMessage(response.data.message);
      setError('');
      setTimeout(() => navigate('/login'), 2000); 
    } catch (error) {
      setError(error.response?.data?.message || 'Something went wrong. Please try again.');
      setMessage('');
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-4/5 hidden lg:block">
        <img 
          src={Image} 
          alt="Reset Password Background" 
          className="w-full h-full object-cover" 
        />
      </div>
      <div className="w-1/2 flex justify-center items-center bg-yellow-100">
        <div className="w-3/4 max-w-md p-8 rounded-lg shadow-lg">
          <h1 className="text-4xl font-semibold text-green-600 text-center">AgroGo</h1>
          <h2 className="text-lg text-gray-700 text-center mt-2">Reset Password</h2>
          
          {message && <p className="text-green-600 text-center mt-4">{message}</p>}
          {error && <p className="text-red-600 text-center mt-4">{error}</p>}
          
          <form onSubmit={handleResetPassword} className="mt-8 space-y-4">
            <div>
              <label className="block text-gray-700">Email:</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                className="w-full p-3 mt-2 border border-gray-300 rounded-md"
                disabled
              />
            </div>
            
            <div>
              <label className="block text-gray-700">New Password:</label>
              <input 
                type="password" 
                value={newPassword} 
                onChange={(e) => setNewPassword(e.target.value)} 
                required 
                className="w-full p-3 mt-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-gray-700">Confirm New Password:</label>
              <input 
                type="password" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                required 
                className="w-full p-3 mt-2 border border-gray-300 rounded-md"
              />
            </div>
            <button type="submit" className="w-full p-3 mt-4 bg-green-600 text-white rounded-md hover:bg-green-700">Reset Password</button>
          </form>
          
        </div>
      </div>
    </div>
  );
}
