import React from 'react'
import { Link } from 'react-router-dom';
import logo from '../assest/logo.png';
function Header() {
  return (
    <header className="fixed shadow-md w-full h-16 px-2 md:px-4 z-50 bg-white">
       <div className="flex items-center h-full justify-between">
        <Link to={""}>
          <div className="h-10">
            <img src={logo} className="h-full" />
          </div>
        </Link>





        </div>



    </header>
  )
}

export default Header