import React from 'react';
import '../assets/HomePage.css'; 
import backgroundImage from '../Images/background.jpg'; 

export default function HomePage(){

    return (
        <div className="app" style={{ backgroundImage: `url(${backgroundImage})` }}>
          <header className="header">
            <div className="logo">AgroGo</div>
            <nav className="nav">
              <a href="#about-us">About us</a>
              <a href="#farmer">Farmer</a>
              <a href="#seller">Seller</a>
              <a href="#executive-officer">Executive officer</a>
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
        </div>
      );
}
