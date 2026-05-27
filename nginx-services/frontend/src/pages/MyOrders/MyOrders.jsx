import React, { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { assets } from "../../assets/frontend_assets/assets";

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);
  const [trackingOrder, setTrackingOrder] = useState(null);

  const fetchOrders = async () => {
    const response = await axios.post(
      url + "/api/order/userorders",
      {},
      { headers: { token } }
    );
    if (response.data.success) {
      setData(response.data.data);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);
  return (
    <div className="my-orders">
      <h2>Orders</h2>
      <div className="container">
        {data.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "var(--text-gray)" }}>
            <h3>No Orders Yet.</h3>
          </div>
        ) : (
          data.map((order, index) => {
            return (
              <div key={index} className="my-orders-order">
                <img src={assets.parcel_icon} alt="" />
                <p>
                  {order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return item.name + " X " + item.quantity;
                    } else {
                      return item.name + " X " + item.quantity + ", ";
                    }
                  })}
                </p>
                <p>₹{order.amount}.00</p>
                <p>items: {order.items.length}</p>
                <p>
                  <span>&#x25cf;</span>
                  <b> {order.status}</b>
                </p>
                <button onClick={() => {
                  fetchOrders();
                  setTrackingOrder(order);
                }}>Track Order</button>
              </div>
            );
          })
        )}
      </div>

      {trackingOrder && (
        <div className="track-order-modal">
          <div className="track-order-modal-content">
            <div className="track-order-modal-header">
              <h3>Track Your Order</h3>
              <img 
                src={assets.cross_icon} 
                alt="Close" 
                onClick={() => setTrackingOrder(null)} 
                className="close-icon"
              />
            </div>
            
            <div className="track-order-map-container">
              <img src={assets.dummy_map} alt="Delivery Map" className="dummy-map-img" />
              <div className="eta-badge">
                <p>ETA: 15-20 mins</p>
              </div>
            </div>

            <div className="track-order-status-info">
              <div className="status-step active">
                <span className="dot">&#x25cf;</span>
                <p>Order Placed</p>
              </div>
              <div className={`status-step ${trackingOrder.status !== 'Food Processing' ? 'active' : ''}`}>
                <span className="dot">&#x25cf;</span>
                <p>Processing</p>
              </div>
              <div className={`status-step ${trackingOrder.status === 'Out for delivery' || trackingOrder.status === 'Delivered' ? 'active' : ''}`}>
                <span className="dot">&#x25cf;</span>
                <p>Out for Delivery</p>
              </div>
              <div className={`status-step ${trackingOrder.status === 'Delivered' ? 'active' : ''}`}>
                <span className="dot">&#x25cf;</span>
                <p>Delivered</p>
              </div>
            </div>
            
            <div className="track-order-footer">
              <p>Current Status: <b>{trackingOrder.status}</b></p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
