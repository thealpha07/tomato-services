import React from "react";
import "./ExploreMenu.css";
import { menu_list } from "../../assets/frontend_assets/assets";

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className="explore-menu-container" id="explore-menu">
      <div className="explore-header">
        <h2 className="explore-title">
          Our <span className="text-orange">Best Delivered</span><br />Categories
        </h2>
        <p className="explore-text">
          It's not just about bringing you good food from<br />
          restaurants, we deliver you experience.
        </p>
      </div>

      <div className="explore-grid">
        {menu_list.slice(0, 6).map((item, index) => {
          // Add some alternating colors for the decorative arcs
          const arcColors = ['arc-green', 'arc-orange', 'arc-yellow'];
          const randomArc = arcColors[index % 3];

          return (
            <div 
              onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)} 
              key={index} 
              className={`explore-item ${category === item.menu_name ? "active-category" : ""}`}
            >
              <div className="explore-item-image-wrapper">
                <div className={`category-arc ${randomArc}`}></div>
                <div className="image-bg-circle">
                  <img src={item.menu_image} alt={item.menu_name} className="food-img" />
                </div>
              </div>
              <h3>{item.menu_name}</h3>
              <span className="order-now">Order Now &gt;</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExploreMenu;
