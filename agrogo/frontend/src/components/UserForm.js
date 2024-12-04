import React, { useState } from "react";
import axios from "axios";
import "../assest/UserForm.css";
import Image from '../Images/Reg (2).jpg';

export default function UserForm(){
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    region: "",
    role: "",
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
        name: formData.username,
        email: formData.email,
        region: formData.region,
        role: formData.role,
        password: formData.password,
      });

    setFormData({
      username: "",
      email: "",
      region: "",
      role: "",
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
                name="username"
                placeholder="Username"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
              />
              <input
                type="text"
                name="region"
                placeholder="Region"
                required
              />
            </div>
            <div>
              <input
                type="text"
                name="role"
                placeholder="Role"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
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