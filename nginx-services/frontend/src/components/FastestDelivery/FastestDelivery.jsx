import React from 'react';
import './FastestDelivery.css';

const FastestDelivery = () => {
  return (
    <div className="delivery-section">
      <div className="dark-wave-bg">
        <div className="delivery-content">
          <div className="delivery-text">
            <h2>
              Fastest food<br />
              <span className="text-orange">Delivery</span> in town
            </h2>
            <p>Get your dream order fresh, steam<br />hot at 20min break time.</p>
          </div>
          
          <div className="delivery-features">
            <div className="feature-item">
              <span className="feature-icon">🚁</span>
              <div>
                <strong>Air delivery</strong>
                <p>Faster than ever at minimum charge</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🤖</span>
              <div>
                <strong>Automated</strong>
                <p>We process food order based on AI management</p>
              </div>
            </div>
          </div>
        </div>

        <div className="pizza-centerpiece">
          <img src="/fastest_delivery_drone.png" alt="Drone" className="drone-img" />
          <img src="/food_delivery_box.png" alt="Delivery Box" className="massive-box" />
        </div>
      </div>

      <div className="how-we-serve">
        <h3>How we <span className="text-orange">Serve</span> you</h3>
        
        <div className="serve-steps">
          <div className="serve-step">
            <div className="step-circle arc-yellow">
              <div className="step-icon">📦</div>
            </div>
            <h4>Automated Packaging</h4>
            <p>100% environment friendly packaging</p>
          </div>
          
          <div className="serve-step">
            <div className="step-circle arc-green">
              <div className="step-icon">💝</div>
            </div>
            <h4>Packed with Love</h4>
            <p>We deliver the best experiences</p>
          </div>
          
          <div className="serve-step">
            <div className="step-circle arc-orange">
              <div className="step-icon">🍿</div>
            </div>
            <h4>Serve hot Appetite</h4>
            <p>Promise to deliver within 30 mins</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FastestDelivery;
