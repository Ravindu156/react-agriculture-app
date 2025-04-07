import React, { useState } from "react";
import axios from "axios";
import Image from '../Images/Reg (2).jpg';
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function UserForm(){
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    region: "",
    mobile: "",
    gender: "",
    role: "user",
    nic: "",
    password: "",
    confirmPassword: "",
    education: "",
    occupation: "",
    experience: ""
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState("");
  const [isAgricultural, setIsAgricultural] = useState(false);

  const navigate = useNavigate();

  const districts = [
    "Ampara", "Anuradhapura", "Badulla", "Batticaloa", "Colombo",
    "Galle", "Gampaha", "Hambantota", "Jaffna", "Kalutara",
    "Kandy", "Kegalle", "Kilinochchi", "Kurunegala", "Mannar",
    "Matale", "Matara", "Monaragala", "Mullaitivu", "Nuwara Eliya",
    "Polonnaruwa", "Puttalam", "Ratnapura", "Trincomalee", "Vavuniya"
  ];

  const gender = ["Male", "Female", "Other"];
  
  const education = [
    "High School Diploma", "Vocational Training/Certificate",
    "Associate Degree", "Bachelor's Degree", "Master's Degree",
    "Doctorate (PhD)", "Professional Degree (e.g.MD, JD, etc.)"
  ];

  const experience = [
    "No Experience", "Less than 1 Year", "1-2 Years",
    "3-5 Years", "6-10 Years", "More than 10 Years"
  ];

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleCheckboxChange = (e) => {
    const isExecutiveOfficer = e.target.checked;
    setIsAgricultural(isExecutiveOfficer);
    setFormData({ ...formData, role: isExecutiveOfficer ? "Agricultural Executive Officer" : "user" });
  };

  const handleEduSelect = (e) => {
    setFormData({ ...formData, education: e.target.value });
  };

  const handleExpSelect = (e) => {
    setFormData({ ...formData, experience: e.target.value });
  };

  const handleGenderSelect = (e) => {
    setFormData({ ...formData, gender: e.target.value });
  };

  const handleDistrictSelect = (e) => {
    setFormData({ ...formData, region: e.target.value });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (statusMessage) {
      setStatusMessage("");
    }
  };

  const validateStep1 = () => {
    if (!formData.firstname || !formData.lastname || !formData.username || 
        !formData.email || !formData.password || !formData.confirmPassword) {
      setStatusMessage("Please fill all the required fields.");
      setStatusType("error");
      return false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setStatusMessage("Passwords do not match.");
      setStatusType("error");
      return false;
    }
    
    return true;
  };

  const validateStep2 = () => {
    if (!formData.region || !formData.nic || !formData.gender || !formData.mobile || 
        !formData.education || !formData.occupation || !formData.experience) {
      setStatusMessage("Please fill all the required fields.");
      setStatusType("error");
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setCurrentStep(2);
      setStatusMessage("");
    }
  };

  const handlePrevious = () => {
    setStatusMessage("");
    setCurrentStep(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // For regular users submitting from step 1
    if (currentStep === 1 && !isAgricultural) {
      if (!validateStep1()) {
        return;
      }
    }
    
    // For agricultural officers submitting from step 2
    if (currentStep === 2) {
      if (!validateStep2()) {
        return;
      }
    }

    try {
      const response = await axios.post("http://localhost:5000/api/users/", formData);

      setFormData({
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        mobile: "",
        region: "",
        gender: "",
        role: "user",
        nic: "",
        password: "",
        confirmPassword: "",
        education: "",
        occupation: "",
        experience: ""
      });
      
      setCurrentStep(1);
      setIsAgricultural(false);
      setStatusMessage("Registration successful!");
      setStatusType("success");
      console.log("User registered:", response.data);
      navigate('/login');
    } catch (error) {
      console.error("Error registering user:", error.response?.data || error.message);
      if (error.response && error.response.data && error.response.data.message) {
        setStatusMessage(error.response.data.message);
      } else {
        setStatusMessage("Error registering user. Please try again.");
      }
      setStatusType("error");
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-3/5 hidden lg:block">
        <img 
          src={Image} 
          alt="Login Background" 
          className="w-full h-full object-cover" 
        />
      </div>
      <div className="w-full lg:w-2/5 bg-yellow-50 flex flex-col items-center justify-center">
        <div className="max-w-md w-full space-y-6">
          <h1 className="text-4xl font-bold text-green-600 text-center">AgroGo</h1>
          <h2 className="text-2xl text-center mb-4">Create your account</h2>

          {statusMessage && (
            <div
              className={`fixed top-0 left-1/2 transform -translate-x-1/2 mb-4 px-8 py-4 text-center text-white rounded-lg shadow-lg z-50 ${
                statusType === "error"
                  ? "bg-gradient-to-r from-red-500 to-red-700 animate-slideDown animate-fadeOut"
                  : "bg-gradient-to-r from-green-400 to-green-600 animate-slideDown animate-fadeOut"
              }`}
            >
              {statusMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {currentStep === 1 && (
              <div className="space-y-4">
                <input
                  type="text"
                  name="firstname"
                  placeholder="First Name"
                  value={formData.firstname}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                  required
                />
                <input
                  type="text"
                  name="lastname"
                  placeholder="Last Name"
                  value={formData.lastname}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                  required
                />
                <div className="relative">
                  <input
                    type={isPasswordVisible ? 'text' : 'password'}
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                    required
                  />
                  <span
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                    className="absolute right-4 top-2 cursor-pointer"
                  >
                    {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                <div className="relative">
                  <input
                    type={isPasswordVisible ? 'text' : 'password'}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                    required
                  />
                  <span
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                    className="absolute right-4 top-2 cursor-pointer"
                  >
                    {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                
                <div>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={isAgricultural}
                      onChange={handleCheckboxChange}
                      className="form-checkbox"
                    />
                    <span className="ml-2">Register as Agricultural Executive Officer</span>
                  </label>
                </div>
                
                <div>
                  <a 
                    className="text-stone-500 hover:text-blue-700 cursor-pointer" 
                    style={{cursor:"pointer"}}
                    onClick={() => navigate("/login")}
                  >
                    You are already registered. Log in here
                  </a>
                </div>
                
                <div className="flex justify-between">
                  {isAgricultural ? (
                    <button 
                      type="button" 
                      onClick={handleNext} 
                      className="px-4 py-2 bg-blue-800 text-white rounded-lg"
                    >
                      Next
                    </button>
                  ) : (
                    <button 
                      type="submit" 
                      className="px-4 py-2 bg-green-800 text-white rounded-lg"
                    >
                      Submit
                    </button>
                  )}
                </div>
              </div>
            )}
            
            {currentStep === 2 && (
              <div className="space-y-4">
                <input
                  type="text"
                  name="mobile"
                  placeholder="Mobile Number"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                />
                
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleGenderSelect}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                  required
                >
                  <option value="">Select Your Gender</option>
                  {gender.map((g, index) => (
                    <option key={index} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
                
                <select
                  name="region"
                  value={formData.region}
                  onChange={handleDistrictSelect}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                  required
                >
                  <option value="">Select Your Region</option>
                  {districts.map((district, index) => (
                    <option key={index} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
                
                <input
                  type="text"
                  name="nic"
                  placeholder="NIC number"
                  value={formData.nic}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"

                />
                
                <select
                  name="education"
                  value={formData.education}
                  onChange={handleEduSelect}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                  required
                >
                  <option value="">Select Your Education Level</option>
                  {education.map((edu, index) => (
                    <option key={index} value={edu}>
                      {edu}
                    </option>
                  ))}
                </select>

                <select
                  name="experience"
                  value={formData.experience}
                  onChange={handleExpSelect}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                  required
                >
                  <option value="">Select Your Experience Level</option>
                  {experience.map((exp, index) => (
                    <option key={index} value={exp}>
                      {exp}
                    </option>
                  ))}
                </select>

                <input
                  type="text"
                  name="occupation"
                  placeholder="Occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                  required
                />
                
                <div className="flex justify-between">
                  <button 
                    type="button" 
                    onClick={handlePrevious} 
                    className="px-4 py-2 bg-blue-800 text-white rounded-lg"
                  >
                    Previous
                  </button>
                  <button 
                    type="submit" 
                    className="px-4 py-2 bg-green-800 text-white rounded-lg"
                  >
                    Submit
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}