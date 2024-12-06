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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
  } catch (error) {
    console.log("error");
  }
};
    return(
      <div className="form">
      <img src = {Image}/>
    <div className="form-container">
      <div className="form-overlay">
        <h1>AgroGo</h1>
        <h2>Create your account</h2>
        <form onSubmit={handleSubmit}>
       
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
            </div>
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
            </div>
            <button type="submit">Submit</button>
        </form>
        </div>
        </div>
        </div>
    )
}