import orderModel from "../models/orderModel.js";
import Stripe from "stripe";
import axios from "axios";
import { redisPublisher } from "../config/redis.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// placing user order from frontend
const placeOrder = async (req, res) => {
// ... omitting unchanged code but wait, replace requires full chunk
  const frontend_url = process.env.FRONTEND_URL;
  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address
    });
    await newOrder.save();

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name
        },
        unit_amount: item.price * 100
      },
      quantity: item.quantity
    }));

    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charges"
        },
        unit_amount: 20 * 100 
      },
      quantity: 1
    });

    const session = await stripe.checkout.sessions.create({
       payment_method_types: ["card", "upi"],
      line_items: line_items,
      mode: 'payment',
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Server Error" });
  }
};

const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success == "true") {
      const order = await orderModel.findByIdAndUpdate(orderId, { payment: true }, { new: true });
      
      // MICROSERVICE COMMUNICATION: Publish event to Redis Pub/Sub
      try {
        await redisPublisher.publish(
          'order-events',
          JSON.stringify({ event: 'OrderPaid', userId: order.userId, orderId: order._id })
        );
        console.log(`Published OrderPaid event for user ${order.userId}`);
      } catch (redisError) {
        console.error('Failed to publish OrderPaid event to Redis:', redisError);
      }
      
      res.json({ success: true, message: "Paid" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Not Paid" });
    }
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Server Error" });
  }
};

// user orders for frontend
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Server Error" });
  }
};

// Listing orders for admin panel
const listOrders = async (req, res) => {
  if (req.body.userRole !== "admin") {
    return res.json({ success: false, message: "Admin access required" });
  }

  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Server Error" });
  }
};

// api for updating order status
const updateStatus = async (req, res) => {
  if (req.body.userRole !== "admin") {
    return res.json({ success: false, message: "Admin access required" });
  }

  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Server Error" });
  }
};

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };