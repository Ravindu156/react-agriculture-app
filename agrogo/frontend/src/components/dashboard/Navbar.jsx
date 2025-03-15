import { Bell, User } from "lucide-react";
import { useState, useEffect } from "react";
import logo from "../dashboard/logo.png";  // Import logo, etc.
import { navItems } from "./constants";  // Import navItems, etc.
import { Link , useNavigate } from 'react-router-dom'; 

const Navbar = () => {
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user")); // Parse the user object
  const role = user?.role || "guest"; // Default to "guest" if no role is found

  const handleLogout = async () => {
    try {
      // Get the token from localStorage or wherever you store it
      const token = localStorage.getItem('token');
      
      // Call logout API
      const response = await fetch('http://localhost:5000/api/users/logout/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Remove token and user info from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        
        // Redirect to login page
        navigate('/login');
      } else {
        console.error('Logout failed:', data.message);
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
  // Filter navItems based on role
  const filteredNavItems = navItems.filter(
    (item) => !item.roles || item.roles.includes(role)
  );

  // Function to toggle the profile menu
  const toggleProfileMenu = () => {
    setProfileMenuOpen((prev) => !prev); // Toggle the profile menu visibility
  };

  // Function to open the notification menu
  const openNotifications = () => {
    setNotificationOpen(true); // Open the notification menu when the button is clicked
  };

  // Function to close the notification menu
  const closeNotifications = () => {
    setNotificationOpen(false); // Close the notification menu
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click happened outside the profile menu and notification menu
      if (
        !event.target.closest(".profile-menu") &&
        !event.target.closest(".notification-menu") &&
        !event.target.closest(".profile-btn") // Make sure we ignore clicks on the profile button
      ) {
        setProfileMenuOpen(false); // Close the profile menu if clicking outside
        closeNotifications(); // Close the notification menu if clicking outside
      }
    };

    // Add event listener
    document.addEventListener("click", handleClickOutside);

    // Cleanup event listener on unmount
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80 bg-gradient-to-r from-white to-[#f8f8f8]">
      <div className="container px-4 mx-auto relative lg:text-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center flex-shrink-0">
            <img className="h-10 w-10 mr-2" src={logo} alt="Logo" />
            <span className="text-xl tracking-tight">Agrogo</span>
          </div>
          <ul className="hidden lg:flex ml-14 space-x-12">
            {filteredNavItems.map((item, index) => (
              <li key={index}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
          <div className="hidden lg:flex items-center space-x-6 ml-auto">
            {/* Notification Button */}
            <button onClick={openNotifications} className="relative hide-scrollbar">
              <Bell size={35} />
              {notificationOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-lg p-2 notification-menu">
                  <p className="text-sm">No new notifications</p>
                </div>
              )}
            </button>

            {/* Profile Button */}
            <button onClick={toggleProfileMenu} className="hide-scrollbar profile-btn">
        <User size={35} />
        {profileMenuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-lg p-2 profile-menu">
            <ul>
              <li>
                {/* Link to Profile page */}
                <Link to="/profile" className="block py-1 px-3" onClick={() => setProfileMenuOpen(false)}>
                  Profile
                </Link>
              </li>
              <li>
              <a href="#" className="block py-1 px-3" onClick={(e) => {
            e.preventDefault(); // Prevent default link behavior
            handleLogout();
          }}>Logout</a>
              </li>
            </ul>
          </div>
        )}
      </button>

            <p>{role}</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
