import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_APP_SERVER_URL;
const TOKEN = JSON.parse(localStorage.getItem("token"));

export const getDishes = createAsyncThunk("dish/getDishes", async () => {
  try {
    const response = await axios({
      url: `${BASE_URL}/dish`,
      method: "get",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    return response.data.dishes;
  } catch (error) {
    console.log("Error while fetching dishes", error.message);
    return error.message;
  }
});
