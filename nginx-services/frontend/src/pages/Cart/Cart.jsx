import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url
  } = useContext(StoreContext);

  const navigate=useNavigate();

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {getTotalCartAmount() === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "var(--text-gray)" }}>
            <h3>Your Cart is Empty</h3>
          </div>
        ) : (
          food_list.map((item, index) => {
            if (cartItems[item._id] > 0) {
              return (
                <div key={index}>
                  <div className="cart-items-title cart-items-item">
                    <img src={url+"/images/"+item.image} alt="" />
                    <p>{item.name}</p>
                    <p>₹{item.price}</p>
                    <p>{cartItems[item._id]}</p>
                    <p>₹{item.price * cartItems[item._id]}</p>
                    <p onClick={() => removeFromCart(item._id)} className="cross">
                      x
                    </p>
                  </div>
                  <hr />
                </div>
              );
            }
            return null;
          })
        )}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotals</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{getTotalCartAmount()===0?0:20}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>₹{getTotalCartAmount()===0?0:getTotalCartAmount()+20}</b>
            </div>
          </div>
          <button onClick={()=>navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promocode, Enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="promo code" />
              <button>Submit</button>
            </div>
            <div style={{ marginTop: '30px' }}>
              <button 
                onClick={() => navigate('/myorders')} 
                style={{
                  padding: '12px 25px', 
                  background: 'white', 
                  color: 'var(--text-dark)', 
                  border: '1px solid #e2e2e2', 
                  borderRadius: '30px', 
                  cursor: 'pointer', 
                  fontSize: '14px',
                  fontWeight: '500',
                  boxShadow: 'var(--shadow-sm)',
                  transition: '0.3s'
                }}
                onMouseOver={(e) => e.target.style.boxShadow = 'var(--shadow-md)'}
                onMouseOut={(e) => e.target.style.boxShadow = 'var(--shadow-sm)'}
              >
                Go to orders ↗
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
