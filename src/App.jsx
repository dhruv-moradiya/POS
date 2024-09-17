import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./page/Home";
import Customer from "./page/Customer";
import Cashier from "./page/Cashier";
import Order from "./page/Order";
import Reports from "./page/Reports";
import Table from "./page/Table";
import SignUp from "./page/auth/SignUp";
import SignIn from "./page/auth/SignIn";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from "./store/store";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/customer" element={<Customer />} />
              <Route path="/cashier" element={<Cashier />} />
              <Route path="/orders" element={<Order />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/table" element={<Table />} />
            </Route>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
          </Routes>
          <Toaster />
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
