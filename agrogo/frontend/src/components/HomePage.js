import React, {useState} from 'react';
import '../assets/HomePage.css'; 
import backgroundImage from '../Images/background.jpg'; 
import about_image from '../Images/background1.jpg'; 

export default function HomePage(){
  const [loading, setLoading] = useState(false); 

  const navigateToSection = (event, sectionId) => {
    event.preventDefault();
    setLoading(true); 
    setTimeout(() => {
      window.location.href = `#${sectionId}`; 
      setLoading(false); 
    }, 800); 
  };

    return (
        <div className="app" style={{ backgroundImage: `url(${backgroundImage})` }}>
          <header className="header">
            <div className="logo">AgroGo</div>
            <nav className="nav">
              <a href="#about-us" onClick={(e)=>navigateToSection(e, 'about-us')}>About us</a>
              <a href="#farmer" onClick={(e)=>navigateToSection(e, 'farmer')}>Farmer</a>
              <a href="#seller" onClick={(e)=>navigateToSection(e, 'seller')}>Seller</a>
              <a href="#executive-officer" onClick={(e)=>navigateToSection(e, 'executive-officer')}>Executive officer</a>
            </nav>
          </header>
    
          <main className="main">
            <div className="overlay">
              <h2>Empowering Agriculture</h2>
              <p>A Hub for Farmers, Sellers, and Agricultural Officers to Thrive Together</p>
              <div className="buttons">
                <button className="register-button">Register</button>
                <button className="login-button">Login</button>
              </div>
            </div>
          </main>
     

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
  <h2>Farmer Section</h2>
  <p>
   
  </p>
</section>

<section id="seller" className="section seller">
  <h2>Seller Section</h2>
  <p>
    
  </p>
</section>

<section id="executive-officer" className="section executive-officer">
  <h2>Executive Officer Section</h2>
  <p>

  </p>
</section>
</div>
);
      
}
