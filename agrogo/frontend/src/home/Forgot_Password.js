import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate,useLocation } from 'react-router-dom';
import Image from '../Images/Reg (2).jpg';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const emailFromLogin = location.state?.email || '';
  const [email, setEmail] = useState(emailFromLogin);
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [currentStep, setCurrentStep] = useState('email'); // 'email', 'otp', 'reset'
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  
  // OTP timer states
  const [timer, setTimer] = useState(120); // 2 minutes
  const [timerActive, setTimerActive] = useState(false);
  
  // Start timer for OTP expiration
  React.useEffect(() => {
    let interval = null;
    
    if (timerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setTimerActive(false);
    }
    
    return () => clearInterval(interval);
  }, [timerActive, timer]);
  
  // Format timer display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  // Request OTP handler
  const handleRequestOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    
    try {
      const response = await axios.post('http://localhost:5000/api/users/request-otp', { email });
      setMessage(response.data.message || 'OTP sent successfully! Check your email.');
      setCurrentStep('otp');
      setTimer(120);
      setTimerActive(true);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  // Verify OTP handler
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    
    try {
      const response = await axios.post('http://localhost:5000/api/users/verify-otp', { email, otp });
      setMessage(response.data.message || 'OTP verified successfully!');
      setCurrentStep('reset');
    } catch (error) {
      setError(error.response?.data?.message || 'Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  // Reset password handler
  const handleResetPassword = async (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    
    setLoading(true);
    setError('');
    setMessage('');
    
    try {
      const response = await axios.post('http://localhost:5000/api/users/reset-password', { 
        email, 
        newPassword, 
        confirmPassword 
      });
      setMessage(response.data.message || 'Password reset successfully!');
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  // Resend OTP handler
  const handleResendOTP = async () => {
    setLoading(true);
    setError('');
    setMessage('');
    
    try {
      const response = await axios.post('http://localhost:5000/api/users/request-otp', { email });
      setMessage(response.data.message || 'OTP resent successfully!');
      setTimer(120);
      setTimerActive(true);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to resend OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="flex min-h-screen">
      <div className="w-4/5 hidden lg:block">
        <img 
          src={Image} 
          alt="Forgot Password Background" 
          className="w-full h-full object-cover" 
        />
      </div>
      <div className="w-1/2 flex justify-center items-center bg-yellow-100">
        <div className="w-3/4 max-w-md p-8 rounded-lg shadow-lg">
          <h1 className="text-4xl font-semibold text-green-600 text-center">AgroGo</h1>
          <h2 className="text-lg text-gray-700 text-center mt-2">
            {currentStep === 'email' && 'Forgot Password'}
            {currentStep === 'otp' && 'Verify OTP'}
            {currentStep === 'reset' && 'Reset Password'}
          </h2>
          
          {message && <p className="text-green-600 text-center mt-4">{message}</p>}
          {error && <p className="text-red-600 text-center mt-4">{error}</p>}
          
          {/* Step 1: Email Input */}
          {currentStep === 'email' && (
            <form onSubmit={handleRequestOTP} className="mt-8 space-y-4">
              <div>
                <label className="block text-gray-700">Email:</label>
                <input 
                  type="email" 
                  value={email} 
                  readOnly  
                  required 
                  className="w-full p-3 mt-2 border border-gray-300 rounded-md"
                  placeholder="Enter your registered email"
                />
              </div>
              
              <button 
                type="submit" 
                className="w-full p-3 mt-4 bg-green-600 text-white rounded-md hover:bg-green-700 flex justify-center items-center"
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Request OTP'}
              </button>
              
              <p className="text-center mt-4">
                <a 
                  href="/login" 
                  className="text-green-600 hover:underline"
                >
                  Back to Login
                </a>
              </p>
            </form>
          )}
          
          {/* Step 2: OTP Verification */}
          {currentStep === 'otp' && (
            <>
              <div className="mt-4 text-center">
                <p className="text-gray-700">We've sent a verification code to</p>
                <p className="font-semibold">{email}</p>
              </div>
              
              <form onSubmit={handleVerifyOTP} className="mt-8 space-y-4">
                <div>
                  <label className="block text-gray-700">Enter OTP:</label>
                  <input 
                    type="text" 
                    value={otp} 
                    onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))} 
                    required 
                    maxLength={6}
                    className="w-full p-3 mt-2 border border-gray-300 rounded-md text-center text-lg tracking-widest"
                    placeholder="123456"
                  />
                </div>
                
                <div className="text-center text-gray-600">
                  {timer > 0 ? (
                    <p>Resend OTP in {formatTime(timer)}</p>
                  ) : (
                    <button 
                      type="button" 
                      onClick={handleResendOTP} 
                      className="text-green-600 hover:underline"
                      disabled={loading}
                    >
                      Resend OTP
                    </button>
                  )}
                </div>
                
                <button 
                  type="submit" 
                  className="w-full p-3 mt-4 bg-green-600 text-white rounded-md hover:bg-green-700"
                  disabled={loading}
                >
                  {loading ? 'Verifying...' : 'Verify OTP'}
                </button>
                
              
              </form>
            </>
          )}
          
          {/* Step 3: Password Reset */}
          {currentStep === 'reset' && (
            <form onSubmit={handleResetPassword} className="mt-8 space-y-4">
              <div>
                <label className="block text-gray-700">Email:</label>
                <input 
                  type="email" 
                  value={email} 
                  readOnly
                  className="w-full p-3 mt-2 border border-gray-300 rounded-md bg-gray-100"
                />
              </div>
              
              <div className="relative">
                <label className="block text-gray-700">New Password:</label>
                <input 
                  type={isPasswordVisible ? 'text' : 'password'} 
                  value={newPassword} 
                  onChange={(e) => setNewPassword(e.target.value)} 
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
              
              <div className="relative">
                <label className="block text-gray-700">Confirm New Password:</label>
                <input 
                  type={isPasswordVisible ? 'text' : 'password'}
                  value={confirmPassword} 
                  onChange={(e) => setConfirmPassword(e.target.value)} 
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
              
              <button 
                type="submit" 
                className="w-full p-3 mt-4 bg-green-600 text-white rounded-md hover:bg-green-700"
                disabled={loading}
              >
                {loading ? 'Resetting...' : 'Reset Password'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}