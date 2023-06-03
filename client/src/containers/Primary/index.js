import { Fragment } from "react"
import Header from "./Header"
import Footer from "./Footer"
import Navigator from "./Navigator";

const PrimaryLayout = ({children, ...props}) => {
    return (
      <Fragment>
        <Header />
        <div className="main-container">
          <div className="nav-container">
            <Navigator/>
          </div>
          <div className="main">{children}</div>
        </div>
        <Footer />
      </Fragment>
    );
}

export default PrimaryLayout;