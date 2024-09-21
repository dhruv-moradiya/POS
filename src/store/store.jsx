import { configureStore } from "@reduxjs/toolkit";
import DishReducer from "../store/dishSlice/DishSlice";
import TableReducer from "../store/tableSlice/TableSlice";
import CustomersReducer from "../store/customerSlice/CustomerSlice";
import OrderReducer from "../store/orderSlice/OrderSlice";
import CurrentUserReducer from "../store/currentUserSlice/CurrentUserSlice";

const store = configureStore({
  reducer: {
    currentUser: CurrentUserReducer,
    dish: DishReducer,
    table: TableReducer,
    customers: CustomersReducer,
    order: OrderReducer,
  },
});

export default store;
