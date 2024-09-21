import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_APP_SERVER_URL;
const TOKEN = JSON.parse(localStorage.getItem("user_info")).accessToken;

export const getOrders = createAsyncThunk("order/getOrders", async () => {
  try {
    const response = await axios({
      url: `${BASE_URL}/order`,
      method: "get",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log("Error while fetching orders :- ", error.message);
    return error.message;
  }
});

export const updateOrderedDishQuantity = createAsyncThunk(
  "order/updateOrderedDishQuantity",
  async ({ id, quantity }) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/order/${id}`,
        { quantity },
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log("Error while updating dish quantity :- ", error.message);
      return error.message;
    }
  }
);
