import React from "react";
import { useLocation } from "react-router-dom";
import "./Footer.css";
import { assets } from "../../assets/frontend_assets/assets";

const Footer = () => {
  const location = useLocation();

  return (
    <div className="footer-container" id="footer">
      {/* Green wave section removed as per user request */}
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <div className="footer-bottom-text">
            <h3>Tomato.</h3>
            <p className="copyright-text">
              Tomato was built by two hungry developers on a rainy Bangalore night after both Zomato and Swiggy failed them. The Frontend Dev worked at Zomato, the Backend Dev worked at Swiggy. Out of pure spite, they vibe coded the entire platform overnight fueled by Red Bull and Rage. Then the app crashed so both of them drove to Rameshwaram cafe and ordered Ghee Podi Idli. #Bangalore_Startups
              <br/><br/>
              © 2026 Tomato | All Rights Reserved. <br/>
              Developed and Maintained by AMA Developers Inc.
            </p>
          </div>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="Facebook" />
            <img src={assets.twitter_icon} alt="Twitter" />
            <img src={assets.linkedin_icon} alt="LinkedIn" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
