import React, { Component, useEffect } from "react";
import NewFooter from "./Footer/NewFooter";
// import SideBarIndex from "./SideBar/SideBarIndex";
// import FooterIndex from "./Footer/FooterIndex";
import { Notify } from "react-redux-notify";
import AuthFooter from "./Footer/AuthFooter";

class FaceAuthLayout extends Component {
  constructor() {
    super();
   
  }
  state = {};
  render() {
    return (
      <div className="app-admin-wrap layout-sidebar-large">
        <Notify position="TopRight" />
        {/* <SideBarIndex /> */}
        <div className="main-content-wrap sidenav-open d-flex flex-column">
          <div className="main-wrap-sec">
            {React.cloneElement(this.props.children)}
          </div>
          <NewFooter />
          {/* <AuthFooter /> */}
        </div>
      </div>
    );
  }
}

export default FaceAuthLayout;
