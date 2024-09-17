import { createSlice } from "@reduxjs/toolkit";
import { getAllCustomers } from "./CustomerThunk";

const customerSlice = createSlice({
  name: "customers",
  initialState: {
    customers: [],
    isCustomerLoading: false,
    isErrorInCustomer: "",
  },
  reducers: {
    updateCustomerList: (state, action) => {
      state.customers = [...state.customers, action.payload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllCustomers.pending, (state) => {
      state.isCustomerLoading = true;
    });
    builder.addCase(getAllCustomers.fulfilled, (state, action) => {
      state.isCustomerLoading = false;
      state.customers = action.payload;
    });
    builder.addCase(getAllCustomers.rejected, (state, action) => {
      state.isCustomerLoading = false;
      state.isErrorInCustomer = action.payload;
    });
  },
});

export const { updateCustomerList } = customerSlice.actions;

export default customerSlice.reducer;
