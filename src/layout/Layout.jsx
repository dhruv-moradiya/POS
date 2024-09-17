import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="w-screen h-screen bg-culture-white flex flex-col gap-2 !overflow-hidden">
      <Navbar />
      <div className="w-full  h-[calc(100vh-64px)] flex gap-2">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
