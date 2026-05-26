import React, { useContext } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";
import {useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate=useNavigate();
  const {token, admin, setAdmin, setToken } = useContext(StoreContext);
  const logout=()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    setToken("");
    setAdmin(false);
    toast.success("Logout Successfully")
    navigate("/");
  }
  return (
    <div className="navbar">
      <div className="navbar-search">
        <span className="search-icon">🔍</span>
        <input type="text" placeholder="Search here..." />
      </div>
      <div className="navbar-right">
        <div className="navbar-icons">
          <span className="icon" title="Notifications">🔔</span>
          <span className="icon" title="Messages">💬</span>
          <span className="icon" title="Settings">⚙️</span>
        </div>
        <div className="navbar-profile-section">
          {token && admin ? (
            <p className="login-conditon cursor" onClick={logout}>Logout</p>
          ) : (
            <p className="login-conditon cursor" onClick={()=>navigate("/")}>Login</p>
          )}
          <img className="profile" src={assets.profile_image} alt="Profile" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
