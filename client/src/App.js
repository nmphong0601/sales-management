import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
const PrimaryLayout = React.lazy(() => import("containers/Primary"));

const loading = () => (
  <div className="animated fadeIn pt-3 text-center">Loading...</div>
);

import routes from "./routes";

class App extends React.Component {
  render() {
    return (
      <>
        <Suspense fallback={loading()}>
          <Routes>
            <Route name="Primary-Layout" element={<PrimaryLayout />}>
              {routes.map(({ component: Component, ...rest }) => {
                return (
                  <Route key={rest.path} element={<Component />} {...rest} />
                );
              })}
            </Route>
          </Routes>
        </Suspense>
        {/* <BrowserRouter>
          <PrimaryLayout></PrimaryLayout>
          <Routes>
            {routes.map(({ component: Component, ...rest }) => {
              return (
                <Route key={rest.path} element={<Component />} {...rest} />
              );
            })}
          </Routes>
        </BrowserRouter> */}
      </>
    );
  }
}

export default App;
