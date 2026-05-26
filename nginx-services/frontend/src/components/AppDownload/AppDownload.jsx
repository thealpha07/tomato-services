import React, { useState } from 'react'
import './AppDownload.css'
import { assets } from '../../assets/frontend_assets/assets'

const AppDownload = () => {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <div className='app-download-container' id='app-download'>
      <div className="app-download-card">
        
        {/* Mockup phone representation */}
        <div className="app-phone-wrapper">
          <div className="app-phone-mockup">
            <div className="phone-bezel"></div>
            <div className="phone-notch"></div>
            <div className="phone-screen">
              
              <div className="phone-header">
                <span className="phone-menu-icon">☰</span>
                <img src="https://i.pravatar.cc/100?img=7" alt="user" className="phone-avatar" />
              </div>
              
              <div className="phone-title">
                Let's eat<br/><strong>Quality food 😋</strong>
              </div>
              
              <div className="phone-search-bar">
                <span className="search-icon">🔍</span> Search food...
              </div>
              
              <div className="phone-categories">
                <div className="cat-chip active">🍔 Fast food</div>
                <div className="cat-chip">🍓 Berry fever</div>
              </div>

              <div className="phone-food-card">
                <img src="/hero_pizza.png" alt="Food" className="phone-food-img" />
                <h5>Cheese Pizza</h5>
                <p>Spicy chicken pizza</p>
                <div className="phone-food-bottom">
                  <span className="calories">🔥 158 Calories</span>
                  <strong className="price">₹ 129.99</strong>
                </div>
              </div>
              
            </div>
          </div>
        </div>

        <div className="app-download-info">
          <h2>Download<br/>our Mobile App</h2>
          <div className="app-users">
            <div className="user-avatars">
              <img src="https://randomuser.me/api/portraits/men/5.jpg" className="avatar a1" alt="user1" />
              <img src="https://randomuser.me/api/portraits/women/18.jpg" className="avatar a2" alt="user2" />
              <img src="https://randomuser.me/api/portraits/men/50.jpg" className="avatar a3" alt="user3" />
              <img src="https://randomuser.me/api/portraits/women/15.jpg" className="avatar a4" alt="user4" />
            </div>
            <button className="arrow-btn" onClick={() => setShowDialog(true)}>↗</button>
          </div>
        </div>

        <div className="app-download-ratings">
          <div className="rating-box">
            <img src={assets.playstore_logo} alt="Play Store" className="store-logo" />
            <div className="stars">★★★★★</div>
            <span>4.6/5</span>
          </div>
          <div className="rating-box">
            <img src={assets.App_Store_Logo} alt="App Store" className="store-logo" />
            <div className="stars">★★★★★</div>
            <span>4.8/5</span>
          </div>
        </div>
      </div>

      {/* Lazy Dev Modal */}
      {showDialog && (
        <div className="lazy-dev-modal-overlay" onClick={() => setShowDialog(false)}>
          <div className="lazy-dev-modal" onClick={e => e.stopPropagation()}>
            <button className="lazy-dev-close" onClick={() => setShowDialog(false)}>×</button>
            <h3 className="lazy-dev-title">Meet the Lazy developers</h3>
            <p className="lazy-dev-subtitle">Sadly the App has not yet been launched by these bunch.</p>
            
            <div className="lazy-dev-list">
              <div className="lazy-dev-item">
                <img src="https://randomuser.me/api/portraits/women/12.jpg" alt="Captain Manshi" />
                <div className="lazy-dev-info">
                  <strong>Captain Manshi Maurya</strong>
                  <span>CEO</span>
                </div>
              </div>
              <div className="lazy-dev-item">
                <img src="https://randomuser.me/api/portraits/men/36.jpg" alt="Abid SK" />
                <div className="lazy-dev-info">
                  <strong>Abid Sajjad Kumnalli</strong>
                  <span>CTO</span>
                </div>
              </div>
              <div className="lazy-dev-item">
                <img src="https://randomuser.me/api/portraits/men/13.jpg" alt="Adarsh S" />
                <div className="lazy-dev-info">
                  <strong>Adarsh Sadanand</strong>
                  <span>Does not work here.</span>
                </div>
              </div>
            </div>
            
            <p className="lazy-dev-footer-text">Maybe one fine day they'll actually launch it. Maybe this will be their break in the industry. Maybe they will forget about this altogether.<br/> Until then, Adios Amigos!</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default AppDownload
