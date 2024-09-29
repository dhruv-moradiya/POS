import { motion } from "framer-motion";

const Button = ({ icon: Icon, label, onClick, className }) => {
  return (
    <motion.button
      className={`flex items-center gap-2 px-2 py-2 bg-culture-white rounded-lg shadow-sm hover:shadow mb-3 font-semibold text-xs ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95, backgroundColor: "rgba(230, 230, 230, 0.8)" }}
      onClick={onClick}
    >
      {Icon && <Icon size={18} />} {/* Render icon if passed */}
      {label && <p>{label}</p>} {/* Render label if passed */}
    </motion.button>
  );
};

export default Button;
