import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import { Fragment } from "react";

const PrimaryLayout = ({ children, ...props }) => {
  return (
    <div className="container-fluid grid grid-col-1 lg:grid-cols-4 gap-2">
      <Sidebar className="fixed left-0 lg:relative bg-nmp-dark-secondary rounded-xl w-auto h-screen" />
      <div className="col-span-3">
        <Header className="bg-nmp-dark-secondary rounded-xl" />
      </div>
    </div>
  );
};

export default PrimaryLayout;
