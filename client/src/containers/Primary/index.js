import { Outlet, useNavigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import { useEffect } from 'react';

const PrimaryLayout = ({ children, ...props }) => {
  const navigate = useNavigate();
  const signOut = (e) => {
    e.preventDefault();
    navigate('/auth/login');
  };

  useEffect(() => {
    const authorizationData = JSON.parse(
      localStorage.getItem('authorizationData')
    );
    if (!authorizationData) {
      navigate('/auth/login');
    }
  }, []);

  return (
    <div className="container-fluid grid grid-col-1 lg:grid-cols-4 gap-2">
      <Sidebar className="bg-nmp-dark-secondary rounded-xl border border-solid border-nmp-primary" />
      <div className="col-span-3">
        <Header className="bg-nmp-dark-secondary rounded-xl border border-solid border-nmp-primary" />
        <div className="container">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default PrimaryLayout;
