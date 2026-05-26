import React, { useContext, useMemo } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";
import Fuse from "fuse.js";

const FoodDisplay = ({ category }) => {
  const { food_list, searchQuery } = useContext(StoreContext);

  const displayedFoods = useMemo(() => {
    if (!searchQuery) return food_list;
    
    const fuse = new Fuse(food_list, {
      keys: ["name", "description"],
      threshold: 0.4, // Allows for typos
    });
    
    return fuse.search(searchQuery).map(result => result.item);
  }, [food_list, searchQuery]);

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {displayedFoods.map((item, index) => {
          const matchesCategory = category === "All" || category === item.category;
          
          if (matchesCategory) {
            return (
              <FoodItem
                key={index}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
