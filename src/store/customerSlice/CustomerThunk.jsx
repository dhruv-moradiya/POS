import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_APP_SERVER_URL;
const TOKEN = JSON.parse(localStorage.getItem("user_info"))?.accessToken || "";

export const getAllCustomers = createAsyncThunk(
  "customers/getAllCustomers",
  async () => {
    try {
      const response = await axios({
        url: `${BASE_URL}/user`,
        method: "get",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });

      return response.data.users;
    } catch (error) {
      console.log("Error while fetching customers :- ", error.message);
      return error.message;
    }
  }
);

export const getCustomerById = createAsyncThunk(
  "customers/getCustomerById",
  async (id) => {
    try {
      const response = await axios({
        url: `${BASE_URL}/user/${id}`,
        method: "get",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      return response.data.user;
    } catch (error) {
      console.log("Error while fetching customers :- ", error.message);
      return error.message;
    }
  }
);
