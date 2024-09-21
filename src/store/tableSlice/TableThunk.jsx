import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_APP_SERVER_URL;
const TOKEN = JSON.parse(localStorage.getItem("user_info")).accessToken;

export const getTables = createAsyncThunk("tables/gettables", async () => {
  try {
    const response = await axios({
      url: `${BASE_URL}/table`,
      method: "get",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    return response.data.tables;
  } catch (error) {
    console.log("Error while fetching tables :- ", error.message);
    return error.message;
  }
});
