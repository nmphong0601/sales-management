import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrimaryLayout from "containers/Primary";

import routes from "./routes";

class App extends React.Component {
  render() {
    return (
      <>
        <PrimaryLayout>
          <BrowserRouter>
            <Routes>
              {routes.map(({ component: Component, ...rest }) => {
                return (
                  <Route key={rest.path} element={<Component />} {...rest} />
                );
              })}
            </Routes>
          </BrowserRouter>
        </PrimaryLayout>
      </>
    );
  }
}

export default App;
