import React, {useState,useEffect} from 'react';
import '../assest/HomePage.css'; 
import about_image from '../Images/background1.jpg'; 
import farmer from '../Images/farmer.jpg';
import seller from '../Images/seller.jpg';
import officer from '../Images/officer.jpg';
import image2 from '../Images/Slider2.jpg';
import image3 from '../Images/Slider3.jpg';
import image4 from '../Images/Slider4.jpg';
import image5 from '../Images/Slider5.jpg';
import { useNavigate } from 'react-router-dom'; 

export default function HomePage(){
  const [loading, setLoading] = useState(false); 
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = [ image2, image3, image4, image5];

  const navigate = useNavigate(); // Declare navigate using the hook

  //////////////////////////////////////////////////////////
  const handleLoginClick = () => {
    // Simulate successful login
    navigate('/dashboard'); // Navigate to the dashboard page
  };


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

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
      
      <div className="carousel-container">
        <div
          className="carousel-slide"
          style={{
            backgroundImage: `url(${images[currentSlide]})`,
            transition: 'background-image 1s ease-in-out',
          }}
        >
          <header className="header">
            <div className="logo">AgroGo</div>
            <nav className="nav">
              <a href="#about-us" onClick={(e)=>navigateToSection(e, 'about-us')}>About us</a>
              <a href="#farmer" onClick={(e)=>navigateToSection(e, 'farmer')}>Farmer</a>
              <a href="#seller" onClick={(e)=>navigateToSection(e, 'seller')}>Seller</a>
              <a href="#executive-officer" onClick={(e)=>navigateToSection(e, 'executive-officer')}>Executive officer</a>
              <a href="#contact-us" onClick={(e)=>navigateToSection(e, 'contact-us')}>Contact Us</a>
            </nav>
          </header>
    
          <main className="main">
            <div className="overlay">
              <h2>Empowering Agriculture</h2>
              <p>A Hub for Farmers, Sellers, and Agricultural Officers to Thrive Together</p>
              <div className="buttons">
                <button className="register-button">Register</button>
                <button className="login-button" onClick={handleLoginClick}>Login</button>
              </div>
            </div>
          </main>
     
</div>
<div className="carousel-nav">
          <button className="prev" onClick={handlePrevSlide}>❮</button>
          <button className="next" onClick={handleNextSlide}>❯</button>
        </div>
      
{loading && (
  <div className="loading-overlay">
    <div className="spinner">
    </div>
  </div>
)}

<section id="about-us" className="section about-us">
  <img src={about_image} alt="Group of students working on agricultural projects"/>
  <h2>About Us</h2>
  <p>
    We are a group of passionate students from the University of Vavuniya, dedicated to 
    transforming the agricultural industry through innovative technology. Our platform, AgroGo, 
    is designed to empower farmers, sellers, and agricultural officers by providing them with a 
    seamless digital experience to manage, trade, and optimize agricultural processes.
    <br/><br/>
    Our mission is to bridge the gap between farmers, suppliers, and the broader agricultural 
    community, enabling more efficient, sustainable, and profitable practices. With the help of
    AI-powered tools, an intuitive user interface, and multilingual support, we aim to make 
    agricultural solutions accessible to everyone, from small-scale farmers to large commercial 
    enterprises.
  </p>
</section>

<section id="farmer" className="section farmer">
<img src={farmer} alt="Group of students working on agricultural projects"/>
  <h2>ARE YOU A FARMER?</h2>
  
  <p>
    As part of AgroGo, farmers have access to a range of tools designed to help them manage their crops, optimize yield, and connect with the right buyers and suppliers. Our platform allows farmers to:
    <ul>
      <li><strong>Track Crop Growth:</strong> </li>
      <li><strong>Sell Directly to Buyers:</strong> </li>
      <li><strong>Receive Expert Advice:</strong> </li>
      <li><strong>Manage Supplies:</strong> </li>
    </ul>
    We aim to empower farmers with the knowledge and tools they need to increase productivity, reduce waste, and grow their businesses in an ever-changing world.
  </p>
</section>

<section id="seller" className="section seller">
<img src={seller} alt="Group of students working on agricultural projects"/>
<h2>ARE YOU A SELLER?</h2>
  <p>
    AgroGo provides a dedicated platform for sellers to manage and expand their agricultural business by offering a range of features:
    <ul>
      <li><strong>Reach a Broader Market:</strong> </li>
      <li><strong>Manage Orders Efficiently:</strong> </li>
      <li><strong>Optimize Pricing:</strong></li>
      <li><strong>Improve Supplier Connections:</strong></li>
    </ul>
    As a seller, AgroGo is your one-stop-shop to grow your business, streamline your operations, and tap into new opportunities in the agricultural market.
  </p>
</section>

<section id="executive-officer" className="section executive-officer">
<img src={officer} alt="Group of students working on agricultural projects"/>
<h2>EXECUTIVE OFFICER SECTION</h2>
  <p>
    Executive officers play a critical role in managing the agricultural sector and ensuring the efficiency of the entire supply chain. AgroGo provides executive officers with the tools and resources to:
    <ul>
      <li><strong>Oversee Agricultural Operations:</strong></li>
      <li><strong>Facilitate Policy Development:</strong></li>
      <li><strong>Collaborate with Stakeholders:</strong></li>
      <li><strong>Track Market Trends:</strong></li>
    </ul>
    AgroGo empowers executive officers by providing a platform for effective decision-making, collaboration, and the implementation of strategies that contribute to the development of the agricultural sector.
  </p>
</section>
<section id = "contact-us">

</section>
</div>
);
      
}
