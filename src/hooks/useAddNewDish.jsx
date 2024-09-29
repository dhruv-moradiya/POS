import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateDishes } from "../store/dishSlice/DishSlice";
import axios from "axios";
import toast from "react-hot-toast";

function useAddNewDish({ reset }) {
  const TOKEN =
    JSON.parse(localStorage.getItem("user_info"))?.accessToken || "";

  const dispatch = useDispatch();
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const onSubmit = (data) => {
    console.log("🚀 ~ handleSubmitForm ~ data:", data);
    setIsFormSubmitted(true);

    const formData = new FormData();
    formData.append("name", data.dishName);
    formData.append("category", data.category);
    formData.append("type", data.type);
    formData.append("spice_level", data.spice_level);
    formData.append("status", data.status);
    formData.append("ingredients", JSON.stringify(data.ingredients.split(",")));
    formData.append("chefs_note", data.chef_note);
    formData.append("preparation_time", data.preparation_time);
    formData.append("price", data.price);

    if (data.dishImage && data.dishImage[0]) {
      formData.append("dishImage", data.dishImage[0]);
    }

    const loadingToast = toast.loading("Adding dish...");

    axios({
      method: "post",
      url: `${import.meta.env.VITE_APP_SERVER_URL}/dish`,
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
      data: formData,
    })
      .then((response) => {
        if (response.status === 201) {
          toast.success("Dish added successfully", { id: loadingToast });
          dispatch(updateDishes(response.data.dish));
        } else {
          toast.error(response.message, { id: loadingToast });
        }
      })
      .catch((error) => {
        console.error("🚀 ~ onSubmit ~ error:", error);
        toast.error(error?.response?.data?.message || "Error adding dish", {
          id: loadingToast,
        });
      })
      .finally(() => {
        setIsFormSubmitted(false);
        reset();
      });
  };

  return { onSubmit, isFormSubmitted };
}

export default useAddNewDish;
