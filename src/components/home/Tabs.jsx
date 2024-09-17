import React from "react";
import { motion } from "framer-motion";

function Tabs({ currentTab, setCurrentTab }) {
  const tabs = [
    "All",
    "Starter",
    "Breakfast",
    "Lunch",
    "Dinner",
    "Dessert",
    "Beverages",
  ];

  return (
    <div className="bg-linen rounded-md shadow-sm p-2">
      {tabs.map((tab, index) => (
        <button
          key={index}
          className="w-[100px] bg-linen px-2 py-1 rounded-md relative"
          onClick={() => setCurrentTab(tab)}
        >
          {tab}
          {currentTab === tab && (
            <motion.div
              layoutId="full-border"
              className="absolute inset-0 border-2 border-amber-sea rounded-md z-10 shadow-md"
              initial={false}
              animate={{
                backgroundColor: "rgba(252, 128, 25, 0.1)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            ></motion.div>
          )}
        </button>
      ))}
    </div>
  );
}

export default Tabs;
