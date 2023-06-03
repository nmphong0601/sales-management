import { AiOutlineDashboard } from "@react-icons/all-files/ai/AiOutlineDashboard";
import styles from "./Index.module.scss";

const navigates = [
  {
    name: "Dashboard",
    icon: <AiOutlineDashboard />,
    uri: "",
  },
];

const Navigator = () => {
  return (
    <nav className={styles.nav}>
      <div className="nav-container">
        {navigates?.map((nav, index) => {
          return (
            <div key={index} className={styles["nav-option"]}>
              {nav.icon}
              <h3>{nav.name}</h3>
            </div>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigator;
