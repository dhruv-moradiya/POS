import { createSlice } from "@reduxjs/toolkit";
import { getOrders } from "./OrderThunk";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    isOrderLoading: false,
    isErrorInOrder: "",
  },
  reducers: {
    updateOrderedDishQuantityOrDiscount: (state, action) => {
      console.log("action :>> ", action.payload);
      state.orders = state.orders.map((order) => {
        if (order._id === action.payload.id) {
          return {
            ...order,
            items: order.items.map((item) => {
              if (item.dish.id === action.payload.dish) {
                return {
                  ...item,
                  qty: action.payload.quantity,
                  discount: action.payload.discount,
                };
              } else {
                return item;
              }
            }),
          };
        } else {
          return order;
        }
      });
    },

    updateOrderList: (state, action) => {
      console.log("New order added in order list :>> ", action.payload);
      state.orders = [...state.orders, action.payload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getOrders.pending, (state) => {
      state.isOrderLoading = true;
    });
    builder.addCase(getOrders.fulfilled, (state, action) => {
      state.isOrderLoading = false;
      state.orders = action.payload.orders;
    });
    builder.addCase(getOrders.rejected, (state, action) => {
      state.isOrderLoading = false;
      state.isErrorInOrder = action.payload;
    });
  },
});

export const { updateOrderedDishQuantityOrDiscount, updateOrderList } =
  orderSlice.actions;

export default orderSlice.reducer;
