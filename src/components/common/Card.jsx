import React from "react";
import { motion } from "framer-motion";

function Card({ setShowDishDetails, dish }) {
  return (
    <div
      className="w-full h-[250px] bg-culture-white rounded-md p-3 flex flex-col gap-2 items-center justify-between relative shadow cursor-pointer"
      onClick={() => setShowDishDetails(dish._id)}
    >
      <div className="w-full h-full overflow-hidden bg-white rounded-md">
        <img
          src={dish.dishImage}
          alt="Image"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-full flex flex-col items-center justify-evenly">
        <p className="text-base">{dish.name}</p>
        <p className="text-base font-semibold">${dish.price}</p>
      </div>
      {dish.isAvailable ? null : <Blinck />}
    </div>
  );
}

export default Card;

function Blinck() {
  return (
    <div className="absolute -top-2 right-0 h-10 flex justify-center items-center">
      <div className="w-2 h-2 bg-red-500 rounded-full"></div>

      <motion.div
        className="absolute w-4 h-4 border-[1px] border-red-500 rounded-full"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [1, 0, 1],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

{
  /* <motion.div
className="w-2 h-2 mt-2 rounded-full"
animate={{
  opacity: [1, 0.5, 1],
  backgroundColor: ["#FF0000", "#FF0000", "#FF0000"],
}}
transition={{
  duration: 1,
  repeat: Infinity,
  repeatType: "loop",
}}
/> */
}
