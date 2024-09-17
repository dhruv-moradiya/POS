import { useState } from "react";
import { motion } from "framer-motion";
import { Edit, X } from "lucide-react";
import { getCapitalizedWord } from "../../utility/helper";

const DishDetails = ({ showDishDetails, setShowDishDetails, dish }) => {
  const [price, setPrice] = useState(dish.price);
  const [status, setStatus] = useState(
    dish.isAvailable ? "Available" : "Unavailable"
  );
  const [isEditingPrice, setIsEditingPrice] = useState(false);
  const [isEditingStatus, setIsEditingStatus] = useState(false);
  const [newPrice, setNewPrice] = useState(price);
  const [newStatus, setNewStatus] = useState(status);

  console.log("dish :>> ", dish);

  const savePrice = () => {
    setPrice(newPrice);
    setIsEditingPrice(false);
  };

  const saveStatus = () => {
    setStatus(newStatus);
    setIsEditingStatus(false);
  };

  const closeDishDetails = () => {
    setShowDishDetails(null);
  };

  return (
    <motion.div
      className="scrollbar overflow-y-auto fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-culture-white rounded-lg p-6 shadow-lg max-w-md w-full h-[550px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-3xl font-bold mb-4">Dish Details</h2>
      <ul className="space-y-3">
        <li className="flex justify-between">
          <p className="font-semibold">Name:</p>
          <p className="text-gray-700">{getCapitalizedWord(dish.name)}</p>
        </li>
        <li className="flex justify-between items-center">
          <p className="font-semibold">Price:</p>
          {isEditingPrice ? (
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
                className="border rounded-lg px-2 py-1"
              />
              <button
                className="text-green-600 hover:text-green-800"
                onClick={savePrice}
              >
                Save
              </button>
              <button
                className="text-red-600 hover:text-red-800"
                onClick={() => setIsEditingPrice(false)}
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-gray-700">${price}</span>
              <button
                className="text-amber-sea hover:text-amber-500"
                onClick={() => setIsEditingPrice(true)}
              >
                <Edit size={16} />
              </button>
            </div>
          )}
        </li>
        <li className="flex justify-between items-center">
          <p className="font-semibold">Status:</p>
          {isEditingStatus ? (
            <div className="flex items-center gap-2">
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="border rounded-lg px-2 py-1"
              >
                <option value="Available">Available</option>
                <option value="Unavailable">Unavailable</option>
              </select>
              <button
                className="text-green-600 hover:text-green-800"
                onClick={saveStatus}
              >
                Save
              </button>
              <button
                className="text-red-600 hover:text-red-800"
                onClick={() => setIsEditingStatus(false)}
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span
                className={`text-${
                  status === "Available" ? "green" : "red"
                }-600`}
              >
                {status}
              </span>
              <button
                className="text-amber-sea hover:text-amber-500"
                onClick={() => setIsEditingStatus(true)}
              >
                <Edit size={16} />
              </button>
            </div>
          )}
        </li>
        <li className="flex justify-between">
          <p className="font-semibold">Category:</p>
          <p className="text-gray-700">{dish.category}</p>
        </li>
        <li className="flex justify-between">
          <p className="font-semibold">Spice Level:</p>
          <p className="text-gray-700">{dish.spice_level}</p>
        </li>
        <li className="flex justify-between">
          <p className="font-semibold">Preparation Time:</p>
          <p className="text-gray-700">{dish.preparation_time} minutes</p>
        </li>
        <li className="flex justify-between">
          <p className="font-semibold pr-4">Ingredients:</p>
          <p className="text-gray-700">{dish?.ingredients?.join(", ")}</p>
        </li>
        <li className="flex justify-between">
          <p className="font-semibold">Calories:</p>
          <p className="text-gray-700">350 kcal</p>
        </li>
        <li className="flex justify-between">
          <p className="font-semibold pr-4">Chef's Note:</p>
          <p className="text-gray-700">{dish.chefs_note}</p>
        </li>
      </ul>
      <div className="flex justify-end mt-6">
        <motion.button
          className="bg-amber-sea text-white text-  xs font-semibold py-2 px-4 rounded-lg hover:bg-amber-500 transition duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => console.log("save changes")}
        >
          Save Changes
        </motion.button>
      </div>
      <button
        className="p-2 bg-linen rounded-full shadow absolute top-1 right-1"
        onClick={closeDishDetails}
      >
        <X size={18} />
      </button>
    </motion.div>
  );
};

export default DishDetails;
