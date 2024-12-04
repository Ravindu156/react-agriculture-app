import React, { useState } from "react";
import axios from "axios";
//import "../assets/UserForm.css";
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

    setFormData({
      username: "",
      email: "",
      region: "",
      role: "",
      password: "",
      confirmPassword: "",
    });
  };
    return(
      <div className="form">
      <img src = {Image}/>
    <div className="form-container">
      <div className="form-overlay">
        <h1>AgroGo</h1>
        <h2>Create your account</h2>
        <form>
       
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
        </form>
        </div>
        </div>
        </div>
    )
}