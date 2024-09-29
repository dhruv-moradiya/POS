import { forwardRef } from "react";
import { motion } from "framer-motion";

const Input = forwardRef(
  ({ className, placeholder, type = "text", id, ...rest }, ref) => {
    return (
      <motion.input
        ref={ref}
        type={type}
        id={id}
        placeholder={placeholder}
        className={`w-full pl-4 pr-3 py-2 bg-opacity-50 rounded-lg border-[2px] border-linen focus:border-linen focus:ring-2 focus:ring-amber-sea/50 outline-none  placeholder-gray-400 transition duration-200 ${className}`}
        {...rest}
      />
    );
  }
);

export default Input;
