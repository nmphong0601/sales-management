import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import { Fragment } from "react";

const PrimaryLayout = ({ children, ...props }) => {
  return (
    <div className="container-fluid grid grid-col-1 lg:grid-cols-4 gap-2">
      <Sidebar className="bg-nmp-dark-secondary rounded-xl border border-solid border-nmp-primary" />
      <div className="col-span-3">
        <Header className="bg-nmp-dark-secondary rounded-xl border border-solid border-nmp-primary" />
      </div>
    </div>
  );
};

export default PrimaryLayout;
