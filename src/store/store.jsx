import { configureStore } from "@reduxjs/toolkit";
import DishReducer from "../store/dishSlice/DishSlice";
import TableReducer from "../store/tableSlice/TableSlice";
import CustomersReducer from "../store/customerSlice/CustomerSlice";
import OrderReducer from "../store/orderSlice/OrderSlice";

const store = configureStore({
  reducer: {
    dish: DishReducer,
    table: TableReducer,
    customers: CustomersReducer,
    order: OrderReducer,
  },
});

export default store;
