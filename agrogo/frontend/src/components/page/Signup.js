import React from 'react'
import loginSignupImage from '../page/login-animation.gif'
import { useState } from 'react';
import { BiShow, BiHide } from 'react-icons/bi';
import {Link} from 'react-router-dom'
import { PiPassword } from 'react-icons/pi';

function SignUp() {
  const [showPassword,setShowPassword]=useState(false)
  const [showConfirmPassword,setShowConfirmPassword]=useState(false)
  const [data,setData]=useState({
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    confirmPassword:"",

  })
  const handleShowPassword = ()=>{
    setShowPassword(preve=>!preve)
  }
  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((preve) => !preve);
  };

  const handleOnChange=(e)=>{
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  }

  const handleUploadProfileImage=(e)=>{
    console.log(e.target.file[0]);

  }
  
  
  return (
    <div className='p-3 md:p-4 '>
        <div className='w-full max-w-sm bg-white m-auto flex items-center flex-col p-4'>

          {/*<h1 className='text-center text-2xl max-w-sm bg-white m-auto'>Sign Up</h1>*/}
          <div className='w-20 overflow-hidden rounded-full drop-shadow-md m-auto'>
                <img src={loginSignupImage} className='w-full'/>
                <label>
                <div className='absolute bottom-0 h-1/2 bg-slate-500 w-full text-center'>
                    <p className='text-xs p-1 text-white'>Upload</p>
                </div>
                <input type={"file"} id="profileImage" accept="image/*" className='hidden' onChange={handleUploadProfileImage}/>
                </label>
          </div>

          <form className='w-full'>
            <label htmlFor='firstName' className='mb'>First Name</label>
            <input type={"text"} id="firstName" name="firstName" className='w-full bg-slate-200 py-1'/>


            <label htmlFor="lastName">Last Name</label>
          <input
            type={"text"}
            id="lastName"
            name="lastName"
            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
           value={data.firstName}
          />

          <label htmlFor="email">Email</label>
          <input
            type={"email"}
            id="email"
            name="email"
            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
            value={data.email}
            onChange={handleOnChange}
          
          />

          <label htmlFor="password">Password</label>
          <div className="flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className=" w-full bg-slate-200 border-none outline-none "
             value={data.password}
              onChange={handleOnChange}
            />
            <span
              className="flex text-xl cursor-pointer"
              onClick={handleShowPassword}
            >
              {showPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

          <label htmlFor="password">Confirm Password</label>
          <div className="flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="password"
              name="password"
              className=" w-full bg-slate-200 border-none outline-none "
             value={data.password}
            onChange={handleOnChange}
            />
            <span
              className="flex text-xl cursor-pointer"
              onClick={handleShowConfirmPassword}
            >
              {showPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>
          <button className="w-full max-w-[150px] m-auto  bg-red-500 hover:bg-red-600 cursor-pointer  text-white text-xl font-medium text-center py-1 rounded-full mt-4 items-center">
            Sign up
          </button>
</form>
          <p className='text-left text-sm mt-5'>Already have account ? <Link to={"login"}>Login</Link></p>

      
        </div>



    </div>
  )
}

export default SignUp