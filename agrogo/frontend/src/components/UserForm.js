import React, { useState } from "react";
import axios from "axios";
import Image from '../Images/Reg (2).jpg';
import { useNavigate } from "react-router-dom";

export default function UserForm(){
  const [formData, setFormData] = useState({
    firstname:"",
    lastname:"",
    username: "",
    email: "",
    region: "",
    mobile:"",
    role: "",
    nic:"",
    password: "",
    confirmPassword: "",
    education: "",
    occupation: "",
    experience: ""
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState(""); 
  

  const navigate = useNavigate();

  

  const districts = [
    "Ampara",
    "Anuradhapura",
    "Badulla",
    "Batticaloa",
    "Colombo",
    "Galle",
    "Gampaha",
    "Hambantota",
    "Jaffna",
    "Kalutara",
    "Kandy",
    "Kegalle",
    "Kilinochchi",
    "Kurunegala",
    "Mannar",
    "Matale",
    "Matara",
    "Monaragala",
    "Mullaitivu",
    "Nuwara Eliya",
    "Polonnaruwa",
    "Puttalam",
    "Ratnapura",
    "Trincomalee",
    "Vavuniya",
  ];

  const roles = [
    "farmer",
    "seller",
    "Agricultural Executive Officer"
  ];

  const education = [
   "High School Diploma",
   "Vocational Training/Certificate",
    "Associate Degree",
    "Bachelor's Degree",
    "Master's Degree",
    "Doctorate (PhD)",
    "Professional Degree (e.g.MD, JD, etc.)"
  ]

  const experience = [
    "No Experience",
      "Less than 1 Year",
      "1-2 Years",
      "3-5 Years",
      "6-10 Years",
     " More than 10 Years"
  ]

  const handleRoleSelect = (e) => {
    const selectedRole = e.target.value;
    setFormData({ ...formData, role: selectedRole });
  };

  const handleEduSelect = (e) => {
    const selectedEdu = e.target.value;
    setFormData({ ...formData, education: selectedEdu });
  };

  const handleExpSelect = (e) => {
    const selectedExp = e.target.value;
    setFormData({ ...formData, experience: selectedExp });
  };

  const handleDistrictSelect = (e) => {
    const selectedDistrict = e.target.value;
    setFormData({ ...formData, region: selectedDistrict });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (statusMessage) {
      setStatusMessage("");
    }
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (!formData.username || !formData.email || !formData.username || !formData.email || !formData.mobile ) {
        setStatusMessage("Please fill all the required fields in Step 1.");
        setStatusType("error");
        return;
      }
    }
    setStatusMessage(""); 
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setStatusMessage(""); 
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/users", formData);

    setFormData({
      firstname:"",
        lastname:"",
      username: "",
      email: "",
      mobile:"",
      region: "",
      role: "",
      nic:"",
      password: "",
      confirmPassword: "",
      education: "",
        occupation: "",
        experience: "",
    });
    setCurrentStep(1); 
      setStatusMessage("Registration successful!");
      setStatusType("success");
      console.log("User registered:", response.data);
      navigate('/dashboard'); 
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

const handleNextStep = () => {
  if (currentStep === 2 && formData.role === "Agricultural Executive Officer") {
    setCurrentStep(3);
  }
};
    return(
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
              <input
                type="text"
                name="mobile"
                placeholder="Mobile Number"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                required
              />
             
                  <div>
                    <a className="text-stone-500 hover:text-blue-700 cursor-pointer" style={{cursor:"pointer"}}onClick={() => navigate("/login")}>You are already registered. Log in here</a>
                  </div>
                
              </div>
            )}
            {currentStep === 2 && (
            <div className="space-y-4">
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
                type="nic"
                name="nic"
                placeholder="NIC number"
                value={formData.nic}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                required
              /> <select
              name="role"
              value={formData.role}
              onChange={handleRoleSelect}
             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
              required
            >
              <option value="">Select Your Role</option>
              {roles.map((role, index) => (
                <option key={index} value={role}>
                  {role}
                </option>
              ))}
              </select>
              
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                required
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                required
              />
            </div>)}
            {currentStep === 3 && (
              <div className="space-y-4">
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
                
              </div>
            )}

            <div className="flex justify-between">
              
            {currentStep < 2 && <button type="button" onClick={handleNext} className="px-4 py-2 bg-blue-800 text-white rounded-lg">Next</button>
            }
              {currentStep === 2 && formData.role !== "Agricultural Executive Officer" && (
                <>
                <button type = "button" onClick = {handlePrevious} className="px-4 py-2 bg-blue-800 text-white rounded-lg">Previous</button>
                <button type="submit" className="px-4 py-2 bg-green-800 text-white rounded-lg">Submit</button></>
              )}
              {currentStep === 2 && formData.role === "Agricultural Executive Officer" && (
                <button type="button" onClick={handleNextStep} className="px-4 py-2 bg-blue-800 text-white rounded-lg">
                  Next
                </button>
              )}
              {currentStep === 3 && (
                <button type="submit" className="px-4 py-2 bg-green-800 text-white rounded-lg">Submit</button>
              )}
          </div>
        </form>
        </div>
        </div>
        </div>
    )
}