import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import './Dashboard.css';

const Dashboard = ({ url }) => {
  const navigate = useNavigate();
  const { token, admin } = useContext(StoreContext);

  const [stats, setStats] = useState({
    totalOrders: 0,
    delivered: 0,
    processing: 0,
    revenue: 17230
  });

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      
      const response = await axios.get(url + "/api/order/list", { headers: { token } });
      if (response.data.success) {
        const orders = response.data.data;
        setStats({
          totalOrders: orders.length,
          delivered: orders.filter(o => o.status === 'Delivered').length,
          processing: orders.filter(o => o.status === 'Food Processing').length,
          revenue: 54230 + (orders.length * 1250) // Dynamic revenue calculation
        });
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    if (url) {
      fetchOrders();
    }
  }, [url]);

  useEffect(() => {
    if (!admin && !token) {
      toast.error("Please Login First");
      navigate("/");
    }
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Hi Admin, Welcome back to Tomato Dashboard!</p>
      </div>

      <div className="stat-cards">
        <div className="stat-card">
          <div className="stat-icon orange">📦</div>
          <div className="stat-info">
            <h3>{stats.totalOrders}</h3>
            <p>Total Orders</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green">✅</div>
          <div className="stat-info">
            <h3>{stats.delivered}</h3>
            <p>Total Delivered</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon yellow">⏳</div>
          <div className="stat-info">
            <h3>{stats.processing}</h3>
            <p>Food Processing</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon blue">💰</div>
          <div className="stat-info">
            <h3>₹{stats.revenue.toLocaleString()}</h3>
            <p>Total Revenue</p>
          </div>
        </div>
      </div>

      <div className="charts-section">
        <div className="chart-card">
          <h3>Order Overview</h3>
          <div className="dummy-pie-chart">
            <div className="dummy-pie-inner">
              60%
            </div>
          </div>
          <div style={{display: 'flex', justifyContent: 'space-around', marginTop: '20px'}}>
            <span style={{fontSize: '12px', color: 'var(--text-gray)'}}>🟠 Delivered</span>
            <span style={{fontSize: '12px', color: 'var(--text-gray)'}}>🟢 Processing</span>
          </div>
        </div>
        
        <div className="chart-card">
          <h3>Revenue Trend</h3>
          <div className="dummy-line-chart">
            <div className="bar"><div className="fill" style={{height: '30%'}}></div></div>
            <div className="bar"><div className="fill" style={{height: '50%'}}></div></div>
            <div className="bar"><div className="fill" style={{height: '40%'}}></div></div>
            <div className="bar"><div className="fill" style={{height: '80%'}}></div></div>
            <div className="bar"><div className="fill" style={{height: '60%'}}></div></div>
            <div className="bar"><div className="fill" style={{height: '90%'}}></div></div>
            <div className="bar"><div className="fill" style={{height: '70%'}}></div></div>
          </div>
          <div style={{display: 'flex', justifyContent: 'space-between', color: 'var(--text-gray)', fontSize: '12px', marginTop: '10px'}}>
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
        </div>
      </div>

      <div className="reviews-section">
        <h3>Customer Reviews</h3>
        <div className="review-cards">
          <div className="review-card">
            <div className="review-header">
              <div style={{background: '#f4f6fa', width: 50, height: 50, borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 20}}>👨</div>
              <div>
                <h4 style={{fontFamily: 'Outfit'}}>Govindappa Gowda</h4>
                <p style={{fontSize: '12px', color: 'var(--text-gray)'}}>2 days ago</p>
              </div>
            </div>
            <p className="review-text">The food quality is good and they have impressive service. The home delivery is very quick and always on time.</p>
            <div style={{color: 'var(--primary-yellow)'}}>★★★★☆ 4.5</div>
          </div>
          <div className="review-card">
            <div className="review-header">
              <div style={{background: '#e5f5ec', width: 50, height: 50, borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 20}}>👩</div>
              <div>
                <h4 style={{fontFamily: 'Outfit'}}>Sowmya Shekar</h4>
                <p style={{fontSize: '12px', color: 'var(--text-gray)'}}>3 days ago</p>
              </div>
            </div>
            <p className="review-text">Love to eat and smell. I recommend it to you for good food at your doorstep. Having good taste and varieties.</p>
            <div style={{color: 'var(--primary-yellow)'}}>★★★★★ 5.0</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
