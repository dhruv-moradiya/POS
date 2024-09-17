import { motion } from "framer-motion";
import { Link, LoaderIcon, X } from "lucide-react";
import { useForm } from "react-hook-form";
import Input from "../../common/Input";
import axios from "axios";
import { notify } from "../../../utility/notify";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateDishes } from "../../../store/dishSlice/DishSlice";

const TOKEN = JSON.parse(localStorage.getItem("token"));

const AddDishForm = ({ setOpenAddDishForm }) => {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    defaultValues: {
      status: "available",
      category: "vegetarian",
      type: "lunch",
      spice_level: "medium",
    },
  });

  const closeAddDishForm = () => {
    setOpenAddDishForm(false);
  };

  const onSubmit = (data) => {
    console.log("🚀 ~ handleSubmitForm ~ data:", data);
    setIsFormSubmitted(true);

    const formData = new FormData();

    formData.append("name", data.dishName);
    formData.append("category", data.category);
    formData.append("type", data.type);
    formData.append("spice_level", data.spice_level);
    formData.append("status", data.status);
    formData.append("ingredients", data.ingredients.split(","));
    formData.append("chefs_note", data.chef_note);
    formData.append("preparation_time", data.preparation_time);
    formData.append("price", data.price);

    if (data.dishImage && data.dishImage[0]) {
      formData.append("dishImage", data.dishImage[0]);
    }

    axios({
      method: "post",
      url: `${import.meta.env.VITE_APP_SERVER_URL}/dish`,
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
      data: formData,
    })
      .then((response) => {
        console.log("🚀 ~ onSubmit ~ response:", response);

        if (response.status === 201) {
          notify("success", "Dish created successfully");
          dispatch(updateDishes(response.data.dish));
        } else {
          notify("error", response.message);
        }
      })
      .catch((error) => {
        console.error("🚀 ~ onSubmit ~ error:", error);
        notify("error", error?.response?.data?.message);
      })
      .finally(() => {
        setIsFormSubmitted(false);
        reset();
      });
  };

  return (
    <motion.div
      className="scrollbar bg-linen fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-8 rounded-lg shadow-lg max-w-lg w-full mx-auto h-[80%] overflow-y-auto z-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.h2
        className="text-2xl font-bold mb-3 text-center"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Add New Dish
      </motion.h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <label className="block font-semibold mb-2">Dish Name</label>
          <Input
            type="text"
            placeholder="Enter dish name..."
            {...register("dishName", {
              required: { value: true, message: "Dish name is required" },
            })}
          />
          {errors.dishName && (
            <p className="text-red-500 text-xs font-semibold">
              {errors.dishName.message}
            </p>
          )}
        </motion.div>
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <label className="block font-semibold mb-2">Price ($)</label>
          <Input
            type="number"
            {...register("price", {
              required: { value: true, message: "Price name is required" },
            })}
          />
          {errors.price && (
            <p className="text-red-500 text-xs font-semibold">
              {errors.price.message}
            </p>
          )}
        </motion.div>
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <label className="block font-semibold mb-2">Status</label>
          <select
            className="w-full border rounded-lg px-4 py-2"
            {...register("status", { defaultValue: "available" })}
          >
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
          </select>
        </motion.div>
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <label className="block font-semibold mb-2">Category</label>
          <select
            className="w-full border rounded-lg px-4 py-2"
            {...register("category", { defaultValue: "vegetarian" })}
          >
            <option value="vegetarian">Vegetarian</option>
            <option value="non-vegetarian">Non-Vegetarian</option>
            <option value="vegan">Vegan</option>
          </select>
        </motion.div>
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <label className="block font-semibold mb-2">Type</label>
          <select
            className="w-full border rounded-lg px-4 py-2"
            {...register("type", { defaultValue: "lunch" })}
          >
            <option value="starter">Starter</option>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
            <option value="dessert">Dessert</option>
          </select>
        </motion.div>
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <label className="block font-semibold mb-2">Spice Level</label>
          <select
            className="w-full border rounded-lg px-4 py-2"
            {...register("spice_level", { defaultValue: "medium" })}
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </motion.div>
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          <label className="block font-semibold mb-2">
            Preparation Time (minutes)
          </label>
          <Input
            type="number"
            placeholder="Enter time..."
            {...register("preparation_time")}
          />
        </motion.div>
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.7 }}
        >
          <label className="block font-semibold mb-2">Ingredients</label>
          <Input
            type="text"
            placeholder="Enter ingredients..."
            {...register("ingredients")}
          />
        </motion.div>
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.8 }}
        >
          <label className="block font-semibold mb-2">Chef's Note</label>
          <textarea
            className="w-full border rounded-lg px-4 py-2 resize-none"
            rows="3"
            {...register("chef_note")}
          ></textarea>
        </motion.div>
        <div>
          <label
            htmlFor="file"
            className="cursor-pointer flex items-center gap-2 font-semibold"
          >
            <Link size={16} />
            <p>Dish Image</p>
          </label>
          <Input
            type="file"
            id="file"
            className="hidden"
            {...register("dishImage", {
              required: {
                value: true,
                message: "Dish Image is required",
              },
            })}
          />
          {errors.dishImage && (
            <p className="text-red-500 text-xs font-semibold">
              {errors.dishImage.message}
            </p>
          )}
        </div>
        <div className="flex justify-end">
          <motion.button
            type="submit"
            className="bg-amber-sea font-semibold text-white text-xs px-6 py-2 rounded-md flex items-center gap-3 shadow hover:shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isFormSubmitted ? (
              <div className="animate-spin">
                <LoaderIcon size={16} />
              </div>
            ) : (
              <p className="text-base">Add Dish</p>
            )}
          </motion.button>
        </div>
      </form>
      <button
        className="p-2 bg-culture-white rounded-full shadow absolute top-1 right-1"
        onClick={closeAddDishForm}
      >
        <X size={18} />
      </button>
    </motion.div>
  );
};

export default AddDishForm;
