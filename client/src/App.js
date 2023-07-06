import React, { Suspense } from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
const DarkLayout = React.lazy(() => import('containers/Dark'));
const LoginPage = React.lazy(() => import('pages/auth/login'));

const loading = () => (
  <div className="animated fadeIn pt-3 text-center">Loading...</div>
);

import routes from './routes';

class App extends React.Component {
  render() {
    return (
      <>
        <Suspense fallback={loading()}>
          <Routes>
            <Route name="Primary-Layout" element={<DarkLayout />}>
              {routes.map(({ component: Component, ...rest }) => {
                return (
                  <Route key={rest.path} element={<Component />} {...rest} />
                );
              })}
            </Route>
            <Route
              path="auth/login"
              exac={true}
              public={true}
              element={<LoginPage />}
            />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Suspense>
      </>
    );
  }
}

export default App;
