import { Menu, X, Bell, User } from "lucide-react";
import { useState } from "react";
import logo from "../dashboard/logo.png";

import { navItems } from "./constants";

const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  const toggleNotifications = () => {
    setNotificationOpen(!notificationOpen);
  };

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80 bg-gradient-to-r from-white to-[#f8f8f8]">
 


      <div className="container px-4 mx-auto relative lg:text-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center flex-shrink-0">
            <img className="h-10 w-10 mr-2" src={logo} alt="Logo" />
            <span className="text-xl tracking-tight">Agrogo</span>
          </div>
          <ul className="hidden lg:flex ml-14 space-x-12">
            {navItems.map((item, index) => (
              <li key={index}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
          <div className="hidden lg:flex items-center space-x-6 ml-auto">
            {/* Notification Button */}
            <button onClick={toggleNotifications} className="relative hide-scrollbar">
              <Bell size={24} />
              {notificationOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-lg p-2">
                  <p className="text-sm">No new notifications</p>
                </div>
              )}
            </button>
            {/* Profile Button */}
            <button onClick={toggleProfileMenu} className="relative hide-scrollbar">
              <User size={24} />
              {profileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-lg p-2">
                  <ul>
                    <li>
                      <a href="#" className="block py-1 px-3">Profile</a>
                    </li>
                    <li>
                      <a href="#" className="block py-1 px-3">Settings</a>
                    </li>
                    <li>
                      <a href="#" className="block py-1 px-3">Logout</a>
                    </li>
                  </ul>
                </div>
              )}
            </button>
            
            
            </div>
          {/* Mobile Navbar Toggle */}
          <div className="lg:hidden md:flex flex-col justify-end">
            <button onClick={toggleNavbar}>
              {mobileDrawerOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {mobileDrawerOpen && (
          <div className="fixed right-0 z-20 bg-neutral-900 w-full p-12 flex flex-col justify-center items-center lg:hidden">
            <ul>
              {navItems.map((item, index) => (
                <li key={index} className="py-4">
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
            
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
