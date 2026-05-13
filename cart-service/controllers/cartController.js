import cartModel from "../models/cartModel.js";

// add items to user cart
const addToCart = async (req, res) => {
  try {
    let userCart = await cartModel.findOne({ userId: req.body.userId });
    
    // If the user doesn't have a cart yet, create one
    if (!userCart) {
      userCart = new cartModel({ userId: req.body.userId, cartData: {} });
    }

    let cartData = userCart.cartData;
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }

    userCart.cartData = cartData;
    userCart.markModified('cartData'); // Crucial for Mixed/Object types in Mongoose
    await userCart.save();

    res.json({ success: true, message: "Added To Cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// remove items from user cart
const removeFromCart = async (req, res) => {
  try {
    let userCart = await cartModel.findOne({ userId: req.body.userId });
    if (!userCart) return res.json({ success: false, message: "Cart not found" });

    let cartData = userCart.cartData;
    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }

    userCart.cartData = cartData;
    userCart.markModified('cartData');
    await userCart.save();

    res.json({ success: true, message: "Removed From Cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// fetch user cart data
const getCart = async (req, res) => {
  try {
    let userCart = await cartModel.findOne({ userId: req.body.userId });
    if (!userCart) {
      return res.json({ success: true, cartData: {} }); // Return empty cart if none exists
    }
    
    res.json({ success: true, cartData: userCart.cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { addToCart, removeFromCart, getCart };