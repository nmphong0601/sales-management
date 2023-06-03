import { AiOutlineSearch } from "@react-icons/all-files/ai/AiOutlineSearch";
import { AiFillBell } from "@react-icons/all-files/ai/AiFillBell";
import styles from "./Index.module.scss";

const Header = () => {
  return (
    <header>
      <div className={styles["logo-container"]}>
        <div className={styles.logo}>Sales Management</div>
        <div className={styles.menu}>
          <div className="menu-icon"></div>
          <div className="menu-icon"></div>
          <div className="menu-icon"></div>
        </div>
      </div>
      <div className={styles["search-bar"]}>
        <input type="text" placeholder="Search" />
        <div className="search-btn">
          <AiOutlineSearch />
        </div>
      </div>
      <div className={styles["message"]}>
        <div className={styles.circle}></div>
        <AiFillBell />
        <div className={styles["profile-picture"]}>
          <img
            src={"/assets/images/avatar.png"}
            style={{ height: "40px" }}
            alt="profile-picture"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
