import React, { useState } from "react";
import axios from "axios";
import "../assest/UserForm.css";
import Image from '../Images/Reg (2).jpg';

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
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState(""); 

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

  const handleRoleSelect = (e) => {
    const selectedRole = e.target.value;
    setFormData({ ...formData, role: selectedRole });
  };

  const handleDistrictSelect = (e) => {
    const selectedDistrict = e.target.value;
    setFormData({ ...formData, region: selectedDistrict });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (!formData.username || !formData.email ) {
        setStatusMessage("Please fill all the required fields in Step 1.");
        setStatusType("error");
        return;
      }
    }
    setStatusMessage(""); 
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setStatusMessage(""); // Clear any error messages
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/users", {
        firstname: formData.firstname,
        lastname: formData.lastname,
        name: formData.username,
        email: formData.email,
        mobile: formData.mobile,
        region: formData.region,
        role: formData.role,
        nic:formData.nic,
        password: formData.password,
      });

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
    });
    setCurrentStep(1); 
      setStatusMessage("Registration successful!");
      setStatusType("success");
      console.log("User registered:", response.data);
  } catch (error) {
    console.error("Error registering user:", error.response?.data || error.message);
      setStatusMessage("Error registering user. Please try again.");
      setStatusType("error");
  }
};
    return(
      <div className="form">
      <img src = {Image}/>
    <div className="form-container">
      <div className="form-overlay">
        <h1>AgroGo</h1>
        <h2>Create your account</h2>

        {statusMessage && <div className={`status-message ${statusType}`}>{statusMessage}</div>}

        <form onSubmit={handleSubmit}>
        {currentStep === 1 && (
            <div>
            <input
                type="text"
                name="firstname"
                placeholder="First Name"
                value={formData.firstname}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="lastname"
                placeholder="Last Name"
                value={formData.lastname}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="mobile"
                placeholder="Mobile Number"
                value={formData.mobile}
                onChange={handleChange}
                required
              />
            </div>)};
            {currentStep === 2 && (
            <div>
            <select
              name="region"
              value={formData.region}
              onChange={handleDistrictSelect}
              className="styled-select"
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
                required
              /> <select
              name="role"
              value={formData.role}
              onChange={handleRoleSelect}
              className="styled-select"
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
                required
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>)};
            <button type="submit">Submit</button>
        </form>
        </div>
        </div>
        </div>
    )
}