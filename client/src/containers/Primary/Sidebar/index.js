import { useState } from "react";
import { Link } from "react-router-dom";

import { MdClose, MdWindow, MdPerson, MdLogout, MdSearch } from "react-icons/md";

import styles from "./Index.module.scss";

const navigates = [
  {
    name: "Dashboard",
    icon: <MdWindow className={styles.icon} />,
    uri: "/",
  },
  {
    name: "Customers",
    icon: <MdPerson className={styles.icon} />,
    uri: "/user",
  },
  {
    name: "Logout",
    icon: <MdLogout className={styles.icon} />,
    uri: "/",
  },
];

const Sidebar = (props) => {
  const { className, ...otherProps } = props;
  const [active, setActive] = useState(null);

  return (
    <aside
      className={`flex flex-col gap-4 p-2 ${className || ""}`}
      {...otherProps}
    >
      <div className="flex items-center">
        <img
          src={"/assets/images/metalic-logo.png"}
          width={48}
          height={48}
          alt="metalic-logo"
        />
        <h2>Sales Management</h2>
      </div>
      <div className="flex items-center bg-nmp-form p-2 rounded-full border border-nmp-line-dark">
        <input className="w-full bg-transparent" placeholder="Search..."/>
        <MdSearch className="text-nmp-white" size={24}/>
      </div>
      <div className="">
        {navigates.map((nav, index) => {
          return (
            <Link
              key={index}
              to={nav.uri}
              onClick={(e) => setActive(index)}
              className={`flex shrink-0 text-nmp-light ml-4 gap-4 items-center relative h-10 transition-all duration-300 ease-linear last:absolute last:bottom-0 ${
                active === index ? "active" : ""
              }`}
            >
              {nav.icon}
              <h3>{nav.name}</h3>
            </Link>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
