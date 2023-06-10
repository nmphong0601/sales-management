import {
  MdSearch,
  MdMail,
  MdSettings,
  MdNotifications,
  MdArrowForwardIos,
} from "react-icons/md";
import styles from "./Index.module.scss";

const Header = (props) => {
  const { className, ...otherProps } = props;
  return (
    <header className={`p-2 ${className || ""}`} {...otherProps}>
      <div className="flex justify-between lg:justify-end">
        <div className="lg:hidden flex justify-start items-center shrink-0">
          <img
            src={"/assets/images/metalic-logo.png"}
            width={32}
            height={32}
            alt="metalic-logo"
          />
          <h3>Sales Management</h3>
        </div>
        <div className={`${styles["search-bar"]}`}>
          <input className="w-full bg-transparent" placeholder="Search..." />
          <MdSearch className="text-nmp-white" size={24} />
        </div>
        <div className="flex justify-end items-center gap-4 bg-nmp-light">
          <div className="flex gap-2">
            <button className={`relative`}>
              <MdSettings />
            </button>
            <button className={`relative ${styles["notificate-circle"]}`}>
              <MdMail />
            </button>
            <button className={`relative ${styles["notificate-circle"]}`}>
              <MdNotifications />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <img
              src="/assets/images/avatar.png"
              width={28}
              height={28}
              alt="profile photo"
            />
            <MdArrowForwardIos className="rotate-90 cursor-pointer" size={12} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
