import React, {useState,useEffect} from 'react';
//import '../assest/HomePage.css'; 
import about_image from '../Images/background1.jpg'; 
import farmer from '../Images/farmer.jpg';
import seller from '../Images/seller.jpg';
import officer from '../Images/officer.jpg';
import image2 from '../Images/Slider2.jpg';
import image3 from '../Images/Slider3.jpg';
import image4 from '../Images/Slider4.jpg';
import image5 from '../Images/Slider5.jpg';
import { useNavigate } from 'react-router-dom'; 
import { IoLocationSharp } from "react-icons/io5";
import { FaMobileAlt } from "react-icons/fa";
import { MdMarkEmailRead } from "react-icons/md";
import { FaFacebookF } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";
import { Link } from 'react-router-dom';
import Logo from '../Images/logo.png';

export default function HomePage() {
  const [loading, setLoading] = useState(false); 
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = [ image2, image3, image4, image5];

  const navigate = useNavigate(); 
  const handleLoginClick = () => {
    navigate('/login');
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleRegisterClick = () => {
    navigate('/register');
  };

  const navigateToSection = (event, sectionId) => {
    event.preventDefault();
    setLoading(true); 
    setTimeout(() => {
      window.location.href = `#${sectionId}`; 
      setLoading(false); 
    }, 800); 
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + images.length) % images.length);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
  };


  

    

  return (
    <div className="relative">
      <div
        className="h-screen bg-cover bg-center transition-all duration-1000"
        style={{
          backgroundImage: `url(${images[currentSlide]})`,
        }}
      >
        <header className="flex justify-between items-center px-8 py-4 bg-black bg-opacity-40">
          <div className="flex items-center space-x-4">
                   <img src={Logo} alt="Logo" className="w-12 h-12 rounded-full shadow-lg" />
                   <h1 className="text-3xl font-bold text-white">AgroGo</h1>
                 </div>
          <nav className="flex space-x-8">
            <a href="#about-us" className="text-white hover:text-green-400" onClick={(e) => navigateToSection(e, 'about-us')}>Who we are</a>
            <a href="#farmer" className="text-white hover:text-green-400" onClick={(e) => navigateToSection(e, 'farmer')}>What we do for you</a>
            <a href="#executive-officer" className="text-white hover:text-green-400" onClick={(e) => navigateToSection(e, 'executive-officer')}>Are you an Executive officer</a>
            <a href="#contact-us" className="text-white hover:text-green-400" onClick={(e) => navigateToSection(e, 'contact-us')}>Contact Us</a>
            {/* <Link to="/inorganic">Exchange</Link> */}
          </nav>
        </header>

        {/* <main className="flex justify-center items-center h-[calc(100vh-80px)] text-[#e8f5e9]">
          <div className="bg-black bg-opacity-50 p-8 text-center max-w-lg rounded-lg">
            <h2 className="text-3xl mb-2 text-shadow-md">Empowering Agriculture</h2>
            <p className="text-lg mb-6 text-shadow-md">A Hub for Farmers, Sellers, and Agricultural Officers to Thrive Together</p>
            <div className="flex justify-center gap-4">
              <button className="px-8 py-3 bg-[#5a845c] text-white rounded hover:bg-[#5b912b]" onClick={handleRegisterClick}>Register</button>
              <button className="px-8 py-3 bg-[#5a845c] text-white rounded hover:bg-[#5b912b]" onClick={handleLoginClick}>Login</button>

            </div>
          </div>
        </main> */}
        <main className="flex justify-center items-center w-full h-[calc(100vh-80px)] text-[#e8f5e9]">
  <div className="bg-black bg-opacity-50 p-8 text-center max-w-lg rounded-lg">
    <h2 className="text-3xl mb-2 text-shadow-md">Empowering Agriculture</h2>
    <p className="text-lg mb-6 text-shadow-md">
      A Hub for Farmers, Sellers, and Agricultural Officers to Thrive Together
    </p>
    <div className="flex justify-center gap-4">
      <button
        className="px-8 py-3 bg-[#5a845c] text-white rounded hover:bg-[#5b912b]"
        onClick={handleRegisterClick}
      >
        Register
      </button>
      <button
        className="px-8 py-3 bg-[#5a845c] text-white rounded hover:bg-[#5b912b]"
        onClick={handleLoginClick}
      >
        Login
      </button>
    </div>
  </div>
</main>

      </div>
      <div className="absolute top-1/2 w-full flex justify-between z-10">
        <button className="bg-black bg-opacity-50 text-white text-2xl p-2 opacity-70 hover:opacity-100" onClick={handlePrevSlide}>❮</button>
        <button className="bg-black bg-opacity-50 text-white text-2xl p-2 opacity-70 hover:opacity-100" onClick={handleNextSlide}>❯</button>
      </div>

      {loading && (
        <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-70 flex justify-center items-center z-50">
          <div className="w-12 h-12 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      )}

      <section id="about-us" className="p-12 bg-[#e8f5e9]">
      <div className="flex items-center justify-between">
        <img src={about_image} alt="Group of students working on agricultural projects" className="h-[400px] w-[450px]" />
        <div className="ml-8 w-[60%]">
        <h2 className="text-center text-2xl mt-8">About Us</h2>
        <p className="text-lg mt-4 text-justify">
          We are a group of passionate students from the University of Vavuniya, dedicated to transforming the agricultural industry through innovative technology. Our platform, AgroGo, is designed to empower users by providing them with a seamless digital experience to manage, trade, and optimize agricultural processes.
          <br /><br />
          Our mission is to bridge the gap between farmers, suppliers, and the broader agricultural community, enabling more efficient, sustainable, and profitable practices. With the help of advisory services and an intuitive user interface, we aim to make agricultural solutions accessible to everyone, from small-scale farmers to large commercial enterprises.
        </p>
        </div>
        </div>
      </section>

      <section id="farmer" className="p-12 bg-[#e8f5e9]">
  <div className="flex items-center justify-between">
    <div className="ml-8 w-[60%]">
      <p className="text-lg mt-4 text-justify">
        As part of AgroGo, farmers have access to a range of tools designed to help them manage their crops, optimize yield, and connect with the right buyers and suppliers. Our platform allows farmers to:
        <ul className="mt-4 list-disc pl-8">
          <li><strong>Track Crop Growth</strong></li>
          <li><strong>Sell Directly to Buyers</strong></li>
          <li><strong>Receive Expert Advice</strong></li>
          <li><strong>Manage Supplies</strong></li>
        </ul>
        We aim to empower farmers with the knowledge and tools they need to increase productivity, reduce waste, and grow their businesses in an ever-changing world.
      </p>
    </div>
    <img src={farmer} alt="Farmer" className="h-[480px] w-[450px]"/>
  </div>
</section>


      <section id="seller" className="p-12 bg-[#fff3e0]">
      <div className="flex items-center justify-between">
        <img src={seller} alt="Seller" className="h-[400px] w-[450px] mx-auto" />
        <div className="ml-8 w-[60%]">
        <p className="text-lg mt-4 text-justify mx-auto w-[80%]">
          AgroGo provides a dedicated platform for sellers to manage and expand their agricultural business by offering a range of features:
          <ul className="mt-4 list-disc pl-8">
            <li><strong>Reach a Broader Market</strong></li>
            <li><strong>Manage Orders Efficiently</strong></li>
            <li><strong>Optimize Pricing</strong></li>
            <li><strong>Improve Supplier Connections</strong></li>
          </ul>
          As a seller, AgroGo is your one-stop-shop to grow your business, streamline your operations, and tap into new opportunities in the agricultural market.
        </p>
        </div>
        </div>
      </section>

      <section id="executive-officer" className="p-12 bg-[#e3f2fd]">
      <div className="flex items-center justify-between">
        <div className="ml-8 w-[60%]">
        <p className="text-lg mt-4 text-justify mx-auto w-[80%]">
          Executive officers play a critical role in managing the agricultural sector and ensuring the efficiency of the entire supply chain. AgroGo provides executive officers with the tools and resources to:
          <ul className="mt-4 list-disc pl-8">
            <li><strong>Oversee Agricultural Operations</strong></li>
            <li><strong>Facilitate Policy Development</strong></li>
            <li><strong>Collaborate with Stakeholders</strong></li>
            <li><strong>Track Market Trends</strong></li>
          </ul>
          AgroGo empowers executive officers by providing a platform for effective decision-making, collaboration, and the implementation of strategies that contribute to the development of the agricultural sector.
        </p>
        </div>
        <img src={officer} alt="Executive Officer" className="h-[480px] w-[450px] mx-auto" />
        </div>
      </section>

      <section id="contact-us" className="bg-[#212121] text-white p-12">
  <h2 className="text-center text-2xl mb-6">Contact Us</h2>
  
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
    {/* Left Column: Location and Mobile */}
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <IoLocationSharp className="text-2xl" />
        <p>
          University of Vavuniya,<br />
          Pampaimadu,<br />
          Mannar Road,<br />
          Vavuniya
        </p>
      </div>
      <div className="flex items-center gap-3">
        <FaMobileAlt className="text-2xl" />
        <p>+94455725570</p>
      </div>
    </div>

    {/* Right Column: Email, Social Links, Website */}
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <MdMarkEmailRead className="text-2xl" />
        <p>agrogo@gmail.com</p>
      </div>
      <div className="flex items-center gap-3">
        <FaFacebookF className="text-2xl" />
        <p>https://facebook.com/agro</p>
      </div>
      <div className="flex items-center gap-3">
        <CgWebsite className="text-2xl" />
        <p>www.agrogo.com</p>
      </div>
    </div>
  </div>

  <div className="mt-8 text-center">
    <p><i><b>Explore more...</b></i></p>
    <br />
    <a href="https://gfair.network/" className="text-blue-400 hover:underline">
      <p>The Global Forum on Agricultural Research and Innovation (GFAR)</p>
    </a><br />
    <a href="https://www.fwi.co.uk/" className="text-blue-400 hover:underline">
      <p>Farmers Weekly</p>
    </a><br />
    <a href="https://www.fao.org/home/en" className="text-blue-400 hover:underline">
      <p>Food and Agriculture Organization (FAO)</p>
    </a>
  </div>
</section>


      <div className="text-center text-white">
        <p>&copy; 2024 AgroGo. All Rights Reserved.</p>
              </div>
              </div>
          
    );
}
