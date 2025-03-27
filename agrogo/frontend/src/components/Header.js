import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assest/logo.png";
import { BsCartFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { logoutRedux } from "../redux/userSlice";
import { toast } from "react-hot-toast";
import { User } from "lucide-react";
import { FaBoxOpen, FaShoppingBag } from "react-icons/fa";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const handleShowMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const handleLogout = () => {
    dispatch(logoutRedux());
    toast("Logout successfully");
  };

  const cartItemNumber = useSelector((state) => state.product.cartItem);

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="flex items-center justify-between px-4 md:px-6 h-16">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="Logo" className="h-10" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-lg font-medium ml-auto mr-5">
          <Link to="/dashboard" className="hover:text-blue-600 transition">Home</Link>
          <Link to="/ecom/newproduct" className="hover:text-blue-600 transition">Add Products</Link>
          <Link to="/ecom/about" className="hover:text-blue-600 transition">Add Review</Link>
        </nav>

        {/* Icons Section */}
        <div className="flex items-center gap-4">
          {/* Cart Icon */}
          <div className="relative">
            <Link to="/ecom/cart" className="text-2xl text-gray-700 hover:text-blue-600 transition">
              <BsCartFill />
            </Link>
            {cartItemNumber.length > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemNumber.length}
              </span>
            )}
          </div>

          {/* User Profile */}
          {token ? (
            <Link to="/ecom/profile" className="text-gray-700 hover:text-blue-600 transition">
              <FaShoppingBag  className="w-7 h-7" title="My Products"/>
            </Link>
          ) : (
            <button onClick={handleLogout} className="text-red-500 hover:text-red-700 transition">Logout</button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
