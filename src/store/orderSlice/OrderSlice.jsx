import { createSlice } from "@reduxjs/toolkit";
import { getOrders, getTodaysOrders } from "./OrderThunk";

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
      console.log("UPDATE ORDER LIST :>> ", action.payload);
      state.orders = [...state.orders, action.payload];
    },

    cancelOrder: (state, action) => {
      console.log("action.payload :>> ", action.payload);

      state.orders = state.orders.map((order) => {
        console.log(
          "order._id === action.payload._id :>> ",
          order._id === action.payload._id
        );

        if (order._id === action.payload._id) {
          return {
            ...order,
            status: action.payload.status,
            table_info: action.payload.table_info || null,
          };
        } else {
          return order;
        }
      });
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

    builder.addCase(getTodaysOrders.pending, (state) => {
      state.isOrderLoading = true;
    });
    builder.addCase(getTodaysOrders.fulfilled, (state, action) => {
      state.isOrderLoading = false;
      state.orders = action.payload.orders;
    });
    builder.addCase(getTodaysOrders.rejected, (state, action) => {
      state.isOrderLoading = false;
      state.isErrorInOrder = action.payload;
    });
  },
});

export const {
  updateOrderedDishQuantityOrDiscount,
  updateOrderList,
  cancelOrder,
} = orderSlice.actions;

export default orderSlice.reducer;
