import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./page/Home";
import Customer from "./page/Customer";
import Cashier from "./page/Cashier";
import Order from "./page/Order";
import Reports from "./page/Reports";
import Table from "./page/Table";
import SignUp from "./page/auth/SignUp";
import SignIn from "./page/auth/SignIn";
import toast, { Toaster } from "react-hot-toast";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./store/store";
import { setCurrentUser } from "./store/currentUserSlice/CurrentUserSlice";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const user_info = JSON.parse(localStorage.getItem("user_info"));
  if (!user_info) {
    return <Navigate to={"/signin"} />;
  }
  return children;
}

function IsAdmin({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user_info = JSON.parse(localStorage.getItem("user_info"));

  console.log("user_info :>> ", user_info);

  if (!user_info) {
    return <Navigate to={"/signin"} />;
  }

  if (!user_info.isAdmin) {
    return toast.error(
      "You are not an admin, only admin can access this page."
    );
    // return <Navigate to={"signin"} />;
  }

  return children;
  // dispatch(setCurrentUser({ ...user, accessToken }));
}

function App() {
  const { currentUser } = useSelector((state) => state);

  console.log("currentUser :>> ", currentUser);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route path="/" element={<Home />} />
            <Route
              path="/customer"
              element={
                <IsAdmin>
                  <Customer />
                </IsAdmin>
              }
            />
            <Route
              path="/cashier"
              element={
                <IsAdmin>
                  <Cashier />
                </IsAdmin>
              }
            />
            <Route
              path="/orders"
              element={
                <IsAdmin>
                  <Order />
                </IsAdmin>
              }
            />
            <Route
              path="/reports"
              element={
                <IsAdmin>
                  <Reports />
                </IsAdmin>
              }
            />
            <Route path="/table" element={<Table />} />
          </Route>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </>
  );
}

export default App;
