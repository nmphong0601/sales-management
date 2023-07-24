import {
  MdSearch,
  MdMail,
  MdSettings,
  MdNotifications,
  MdArrowForwardIos,
  MdAccountCircle,
  MdLogout,
} from 'react-icons/md';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';

import styles from './Index.module.scss';

import { useDispatch } from 'react-redux';
import { logout } from 'actions/authActions';

const Header = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { className, ...otherProps } = props;
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const signOut = (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate('/auth/login');
  };

  return (
    <header className={`p-2 ${className || ''}`} {...otherProps}>
      <div className="flex justify-between lg:justify-end gap-8">
        <div className="lg:hidden flex justify-start items-center shrink-0">
          <img
            src={'/assets/images/metalic-logo.png'}
            width={32}
            height={32}
            alt="metalic-logo"
          />
          <h3>Sales Management</h3>
        </div>
        <div className={`${styles['search-bar']}`}>
          <input className="w-full bg-transparent" placeholder="Search..." />
          <MdSearch className="text-nmp-white" size={20} />
        </div>
        <div className="flex justify-end items-center gap-2 bg-nmp-light">
          <div className="flex gap-2">
            <button className={`relative`}>
              <MdSettings />
            </button>
            <button className={`relative ${styles['notificate-circle']}`}>
              <MdMail />
            </button>
            <button className={`relative ${styles['notificate-circle']}`}>
              <MdNotifications />
            </button>
          </div>
          <div
            className="relative flex items-center gap-2 shrink-0"
            onClick={(e) => setIsOpenMenu(!isOpenMenu)}
          >
            <img
              src="/assets/images/avatar.png"
              width={28}
              height={28}
              alt="profile photo"
              className="bg-nmp-white rounded-full"
            />
            <MdArrowForwardIos className="rotate-90 cursor-pointer" size={12} />
            {isOpenMenu && (
              <div className="absolute min-w-[240px] top-full right-0 bg-nmp-dark-secondary w-max border border-solid border-nmp-primary rounded-xl">
                <ul className="w-full">
                  <li className="hover:bg-nmp-primary p-2 rounded-xl">
                    <Link to={'/account/profile'} className="flex items-center">
                      <MdAccountCircle className="mr-4" />
                      <span>Profile</span>
                    </Link>
                  </li>
                  <li className="hover:bg-nmp-primary p-2 rounded-xl">
                    <Link
                      className="flex items-center"
                      onClick={(e) => signOut(e)}
                    >
                      <MdLogout className="mr-4" />
                      <span>Logout</span>
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
