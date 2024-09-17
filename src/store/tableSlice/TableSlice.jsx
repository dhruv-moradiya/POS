import { createSlice } from "@reduxjs/toolkit";
import { getTables } from "./TableThunk";

const tableSlice = createSlice({
  name: "dish",
  initialState: {
    tables: [],
    isTableLoading: false,
    isErrorInTable: "",
  },
  reducers: {
    updateCustomerInfo: (state, action) => {
      state.tables = state.tables.map((table) => {
        if (table._id === action.payload.table_id) {
          return {
            ...table,
            isOccupied: action.payload.isOccupied,
            currentCustomer: action.payload.currentCustomer,
          };
        } else {
          return table;
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTables.pending, (state) => {
      state.isTableLoading = true;
    });
    builder.addCase(getTables.fulfilled, (state, action) => {
      state.isTableLoading = false;
      state.tables = action.payload;
    });
    builder.addCase(getTables.rejected, (state, action) => {
      state.isTableLoading = false;
      state.isErrorInTable = action.payload;
    });
  },
});

export const { updateCustomerInfo } = tableSlice.actions;

export default tableSlice.reducer;
