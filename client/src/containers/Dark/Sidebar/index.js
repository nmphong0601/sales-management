import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import {
  MdClose,
  MdWindow,
  MdPerson,
  MdLogout,
  MdSearch,
  MdChevronRight,
} from 'react-icons/md';

import styles from './Index.module.scss';

const navigates = [
  {
    name: 'Dashboard',
    icon: <MdWindow className={styles.icon} />,
    uri: '/',
  },
  {
    name: 'User',
    icon: <MdPerson className={styles.icon} />,
    uri: '/user',
  },
  {
    name: 'Logout',
    icon: <MdLogout className={styles.icon} />,
    uri: '/account/logout',
  },
];

const Sidebar = (props) => {
  const { className, ...otherProps } = props;
  const [active, setActive] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    navigates.forEach((nav, index) => {
      if (location.pathname.includes(nav.uri)) {
        setActive(index);
      }
    });
  }, [location]);

  return (
    <aside
      className={`${styles['sidebar']} ${className || ''} ${
        isOpen ? 'translate-x-0' : ''
      }`}
      {...otherProps}
    >
      <div className="lg:flex items-center hidden">
        <img
          src={'/assets/images/metalic-logo.png'}
          width={48}
          height={48}
          alt="metalic-logo"
        />
        <h2>Sales Management</h2>
      </div>
      <div className={`${styles['search-bar']}`}>
        <input className="w-full bg-transparent" placeholder="Search..." />
        <MdSearch className="text-nmp-white" size={20} />
      </div>
      <div className="relative h-full">
        {navigates.map((nav, index) => {
          return (
            <Link
              key={index}
              to={nav.uri}
              onClick={(e) => setActive(index)}
              className={`${styles['nav']} ${
                active === index ? styles['active'] : ''
              }`}
            >
              {nav.icon}
              <h3>{nav.name}</h3>
            </Link>
          );
        })}
      </div>
      <button
        className={`absolute w-8 h-16 bg-nmp-primary left-full top-1/4 rounded-tr-xl rounded-br-xl lg:hidden`}
        onClick={(e) => setIsOpen(!isOpen)}
      >
        <MdChevronRight
          className={`w-full h-full ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
    </aside>
  );
};

export default Sidebar;
