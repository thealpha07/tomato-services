import React, { useContext } from "react";
import "./Header.css";
import { StoreContext } from "../../context/StoreContext";

const Header = ({ setCategory }) => {
  const { setSearchQuery } = useContext(StoreContext);

  const handleViewMenuClick = () => {
    if (setCategory) setCategory("All");
    setSearchQuery("");
  };

  return (
    <div className="header-container">
      <div className="hero-left">
        <h1 className="hero-title">
          Fastest<br />
          <span className="text-orange">Delivery</span> &<br />
          Easy <span className="text-orange">Pickup</span>
        </h1>
        <div className="hero-subtitle-box">
          <img src="/hero_model.png" alt="user" className="tiny-avatar" />
          <p>When you are too lazy to cook,<br />we are just a click away !</p>
        </div>
        <div className="hero-buttons">
          <a href="#explore-menu" onClick={handleViewMenuClick} className="btn-primary">
            <span className="icon">🔍</span> Find Restaurants
          </a>
          <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ textDecoration: 'none' }}>
            <span className="play-icon">▶</span> How to order
          </a>
        </div>
      </div>
      
      <div className="hero-right">
        <div className="hero-image-wrapper">
          <div className="yellow-circle"></div>
          <img src="/hero_model.png" alt="Happy customer eating" className="main-hero-img" />
          
          {/* Floating Badges */}
          <div className="floating-badge badge-1">
            <span className="badge-icon">🛵</span>
            <div className="badge-text">
              <strong>Fast delivery</strong>
              <span>Promise to deliver within 30 mins</span>
            </div>
          </div>
          <div className="floating-badge badge-2">
            <span className="badge-icon">🛍️</span>
            <div className="badge-text">
              <strong>Pick up</strong>
              <span>Pickup delivery at your doorstep</span>
            </div>
          </div>
          <div className="floating-badge badge-3">
            <span className="badge-icon">🍽️</span>
            <div className="badge-text">
              <strong>Dine in</strong>
              <span>Enjoy your food fresh crispy and hot</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
