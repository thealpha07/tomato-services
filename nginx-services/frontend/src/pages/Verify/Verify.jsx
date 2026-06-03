import React, { useContext, useEffect } from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { toast } from "react-toastify";

const Verify = () => {
    const [searchParams,setSearchParams]=useSearchParams();
    const success=searchParams.get("success");
    const orderId=searchParams.get("orderId");
    const {url, setCartItems, loadCardData} =useContext(StoreContext);
    const navigate= useNavigate();

    const verifyPayment=async()=>{
        const token = localStorage.getItem("token");
        const response= await axios.post(url+"/api/order/verify",{success,orderId},{headers:{token}});
        if(response.data.success){
            // Cart is already cleared in DB by order-service (via direct HTTP call)
            // Sync React state with the now-empty DB cart
            setCartItems({});
            navigate("/myorders");
            toast.success("Order Placed Successfully");
        }else{
            toast.error(response.data.message || "Something went wrong");
            navigate("/");
        }
    }
    useEffect(()=>{
        verifyPayment();
    },[])
  return (
    <div className='verify'>
        <div className="spinner"></div>
    </div>
  )
}

export default Verify
