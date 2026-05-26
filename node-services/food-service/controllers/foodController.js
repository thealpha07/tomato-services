import foodModel from "../models/foodModel.js";
import fs from "fs";

// add food items
const addFood = async (req, res) => {
  if (req.body.userRole !== "admin") {
    return res.json({ success: false, message: "Admin access required" });
  }

  let image_filename = `${req.file.filename}`;
  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });

  try {
    await food.save();
    res.json({ success: true, message: "Food Added" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Server Error" });
  }
};

// all foods
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Server Error" });
  }
};

// remove food item
const removeFood = async (req, res) => {
  if (req.body.userRole !== "admin") {
    return res.json({ success: false, message: "Admin access required" });
  }

  try {
    const food = await foodModel.findById(req.body.id);
    if (!food) {
      return res.json({ success: false, message: "Food not found" });
    }
    fs.unlink(`uploads/${food.image}`, (err) => {
      if (err) console.error("Failed to delete image:", err);
    });
    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food Removed" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Server Error" });
  }
};

export { addFood, listFood, removeFood };