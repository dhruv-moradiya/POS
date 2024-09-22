import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { indianDishes } from "../../../data";

function AddNewDishModel({
  dishes,
  setOpenAddNewDishModel,
  setOrderedDishes,
  position,
}) {
  const [inputValue, setInputValue] = useState("");
  const [selectedDish, setSelectedDish] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [filteredData, setFilteredData] = useState([]);

  function selectDishes() {
    if (selectedDish && selectedDish.isAvailable && Number(quantity) > 0) {
      setOrderedDishes((prev) => {
        const existingDish = prev.find((dish) => dish._id === selectedDish._id);

        if (existingDish) {
          return prev.map((dish) =>
            dish._id === selectedDish._id
              ? { ...dish, qty: Number(dish.qty) + Number(quantity) }
              : dish
          );
        } else {
          return [
            ...prev,
            {
              _id: selectedDish._id,
              name: selectedDish.name,
              price: selectedDish.price,
              category: selectedDish.category,
              qty: quantity,
            },
          ];
        }
      });
    }
    setQuantity(1);
    setSelectedDish(null);
  }

  const filterData = () => {
    if (inputValue === "") {
      setFilteredData([]);
      return;
    }

    const data = dishes.filter((dish) =>
      dish.name.toLowerCase().includes(inputValue.toLowerCase())
    );

    setFilteredData(data);
  };

  useEffect(() => {
    filterData();
  }, [inputValue]);

  return (
    <div
      className={`flex flex-col gap-3 items-center p-3 px-5 rounded-md ${
        !position
          ? "w-[80%]  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-md"
          : "w-full static"
      } bg-culture-white`}
    >
      <h3 className="font-semibold">Add new dish</h3>
      <input
        type="text"
        placeholder="Type dish name...."
        className="w-full placeholder: p-2 pl-4 rounded outline-none"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <ul className="scrollbar w-full h-[200px] overflow-y-auto">
        <AnimatePresence>
          {(filteredData.length > 0 ? filteredData : dishes)?.map(
            (item, index) => (
              <motion.li
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                onClick={() => setSelectedDish(item)}
                className={`${index % 2 === 0 ? "bg-white" : "bg-linen"} ${
                  selectedDish?.name === item.name
                    ? "border border-amber-sea"
                    : ""
                } w-full rounded-md p-1 px-2 cursor-pointer my-1 overflow-hidden text-ellipsis whitespace-nowrap hover:shadow-sm`}
              >
                {item.name}
              </motion.li>
            )
          )}
        </AnimatePresence>
      </ul>

      <input
        type="number"
        placeholder="Quantity"
        className="placeholder: p-1 pl-2 rounded"
        onChange={(e) => setQuantity(e.target.value)}
        value={quantity}
      />

      <div className="flex items-center justify-center gap-3">
        <motion.button
          className="bg-amber-sea font-semibold text-white text-xs w-[100px] py-2 rounded-md flex items-center justify-center gap-3 shadow hover:shadow-md"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={selectDishes}
        >
          <p>Add</p>
        </motion.button>
        <motion.button
          className="bg-green-600 font-semibold text-white text-xs w-[100px] py-2 rounded-md flex items-center justify-center gap-3 shadow hover:shadow-md"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setOpenAddNewDishModel(false)}
        >
          <p>Cancel</p>
        </motion.button>
      </div>
    </div>
  );
}

export default AddNewDishModel;
