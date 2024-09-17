import React, { useState, useId } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

function Radiobutton({ index, selected, setSelected }) {
  return (
    <div className="">
      <motion.div
        key={index}
        className={`w-5 h-5 border-black border-2 rounded cursor-pointer flex items-center justify-center`}
        id={`${index}`}
        onClick={() => setSelected(`${index}`)}
        whileHover={{ scale: 1.1 }}
        whileTap={{
          scale: 0.9,
          borderWidth: "2px",
          borderColor: "#FC8019",
        }}
        style={{
          borderColor: selected === `${index}` ? "#FC8019" : "#000",
        }}
      >
        {selected === `${index}` && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Check size={14} color="#FC8019" />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default Radiobutton;
