import React from 'react'
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'
import { FaUserAlt } from "react-icons/fa";
import {BsCartFill} from "react-icons/bs"
const Header = () => {
  return (
    <header className='fixed shadow-md w-full h-16 px-2 md:px-4'>
        <div className='flex items-center h-full justify-between'>
        <Link to={""}>
        <div className='h-16'>
            <img src={logo} className='h-full'/>
        </div>
        </Link>
        <div className="">
          <nav>
          <Link to={""}>Home</Link>
          <Link to={"menu"}>Menu</Link>
          <Link to={"about"}>About</Link>
          <Link to={"contact"}>Contact</Link>

          </nav>
          <div className=''>
            <BsCartFill/>
          </div>
          <div className=''>
            <FaUserAlt/>
          </div>

        </div>
        </div>
    </header>
    
  )
}

export default Header

