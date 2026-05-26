import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import { Route, Routes } from "react-router-dom";
import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import Orders from "./pages/Orders/Orders";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";

import Dashboard from "./pages/Dashboard/Dashboard";

const App = () => {
  const url = import.meta.env.VITE_BACKEND_URL;
  return (
    <>
      <ToastContainer />
      <div className="admin-app">
        <Sidebar />
        <div className="main-wrapper">
          <Navbar />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Login url={url}/>} />
              <Route path="/dashboard" element={<Dashboard url={url} />} />
              <Route path="/add" element={<Add url={url}/>} />
              <Route path="/list" element={<List url={url}/>} />
              <Route path="/orders" element={<Orders url={url}/>} />
            </Routes>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default App;
