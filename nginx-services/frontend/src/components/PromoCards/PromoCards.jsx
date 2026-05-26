import React from 'react';
import './PromoCards.css';

const PromoCards = () => {
  return (
    <div className="promo-container">
      <div className="promo-grid">
        {/* Large Left Card */}
        <div className="promo-card promo-large">
          <div className="promo-bg-shape"></div>
          <div className="promo-content">
            <h2>Buy 2<br/>Get 1 free</h2>
            <div className="price-tag star-tag">
              <span>₹189</span>
            </div>
            <div className="promo-footer">
              <span>Hotline</span>
              <strong>01845385306</strong>
            </div>
          </div>
          <img src="/burger_promo.png" alt="Burger Promo" className="promo-img-large" />
        </div>

        {/* Small Right Cards */}
        <div className="promo-column">
          <div className="promo-card promo-small promo-dark">
            <div className="promo-bg-shape dark-shape"></div>
            <div className="promo-content">
              <div className="price-tag brush-tag">₹249</div>
              <div className="discount-tag">Save<br/>20%</div>
              <br/><br/><br/>
              <h3>Itsuki Ramen</h3>
              <p>Made with love</p>
            </div>
            <img src="/noodles_promo.png" alt="Noodles Promo" className="promo-img-small waffle-img" />
          </div>

          <div className="promo-card promo-small promo-orange">
            <div className="promo-bg-shape orange-shape"></div>
            <div className="promo-content">
              <h3>Paneer Butter Masala</h3>
              <p>Get your order fresh</p>
              <div className="price-tag brush-tag-white">
                <div className="price-inner">
                  <strong>₹120</strong>
                  <span>off</span>
                </div>
              </div>
            </div>
            <img src="/paneer_roti_promo.png" alt="Paneer Promo" className="promo-img-small taco-img" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoCards;
