import React, { Component, useEffect } from "react";
import HeaderIndex from "./Header/HeaderIndex";
import NewFooter from "./Footer/NewFooter";
// import SideBarIndex from "./SideBar/SideBarIndex";
// import FooterIndex from "./Footer/FooterIndex";
import { Notify } from "react-redux-notify";
import AuthFooter from "./Footer/AuthFooter";
import { fetchUserDetailsStart } from "../../store/actions/UserAction";
import api from "../../Environment";

class MainLayout extends Component {
  constructor() {
    super();
    setInterval(function(){
      api.postMethod('profile').then(res => {
        if(!res.data.data.status) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("userId");
          localStorage.removeItem("userLoginStatus");
          localStorage.removeItem("user_picture");
          localStorage.removeItem("username");
          localStorage.removeItem("socket");
          localStorage.removeItem("status");
        }
      }).catch(err => {
        console.log(err);
      });
    }, 50000);
  }
  state = {};
  render() {
    return (
      <div className="app-admin-wrap layout-sidebar-large">
        <Notify position="TopRight" />
        <HeaderIndex />
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

export default MainLayout;
