import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import Header from './Header';
import Sidebar from './Sidebar';

const DarkLayout = ({ children, ...props }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const userInfor = JSON.parse(localStorage.getItem('userInfor'));
    if (!userInfor) {
      navigate('/auth/login');
    }
  }, []);

  return (
    <div className="container-fluid grid grid-col-1 lg:grid-cols-4 gap-2">
      <Sidebar className="bg-nmp-dark-secondary rounded-xl border border-solid border-nmp-primary" />
      <div className="col-span-3">
        <Header className="bg-nmp-dark-secondary rounded-xl border border-solid border-nmp-primary" />
        <div className="container mt-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DarkLayout;
