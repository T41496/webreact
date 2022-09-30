import React, { Component } from "react";
import AuthHeader from "./Header/AuthHeader";
import { Notify } from "react-redux-notify";
import NewFooter from "./Footer/NewFooter";

class AuthLayout extends Component {
  state = {};
  render() {
    return (
      <div>
        <Notify position="TopRight" />
        <AuthHeader />
        <div className="landing-main-wrapper">
          {React.cloneElement(this.props.children)}
        </div>
        <NewFooter />
      </div>
    );
  }
}

export default AuthLayout;
