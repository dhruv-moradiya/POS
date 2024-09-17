import { createSlice } from "@reduxjs/toolkit";
import { getDishes } from "./DishThunk";

const dishSlice = createSlice({
  name: "dish",
  initialState: {
    dishes: [],
    isDishesLoading: false,
    isErrorInDishes: "",
  },
  reducers: {
    updateDishes: (state, action) => {
      state.dishes = [...state.dishes, action.payload];
    },
  },
  extraReducers: (builder) => {
    // GET DISHES
    builder.addCase(getDishes.pending, (state) => {
      state.isDishesLoading = true;
    });
    builder.addCase(getDishes.fulfilled, (state, action) => {
      state.isDishesLoading = false;
      state.dishes = action.payload;
    });
    builder.addCase(getDishes.rejected, (state, action) => {
      state.isDishesLoading = false;
      state.isErrorInDishes = action.payload;
    });
  },
});

export const { updateDishes } = dishSlice.actions;
export default dishSlice.reducer;
