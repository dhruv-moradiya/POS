import React from "react";
import { motion } from "framer-motion";

function Tabs({ tabs, currentTab, setCurrentTab, bigTabs }) {
  return (
    <div className="bg-linen rounded-md shadow- p-2">
      {tabs.map((tab, index) => (
        <button
          key={index}
          className={`${bigTabs ? "w-fit px-4" : "w-[100px]"} ${
            tab === currentTab ? "text-amber-sea" : ""
          } bg-linen px-2 py-1 rounded-md relative`}
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
