import React from "react";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";

export const NewsFeed = () => {
  return (
    <div className="flex flex-col h-screen w-screen max-w-screen overflow">
      <Navbar />
      <>
        <Outlet />
      </>
    </div>
  );
};
