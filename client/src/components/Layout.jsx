import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="px-2 min-h-screen flex flex-col bg-black text-white">
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
