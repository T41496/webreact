import React, { Component } from "react";
import { Notify } from "react-redux-notify";
// import AuthFooter from "./Footer/AuthFooter";
import EmptyHeader from "./Header/EmptyHeader";

class EmptyLayout extends Component {
  state = {};
  render() {
    return (
      <div>
        <Notify position="TopRight" />
        <EmptyHeader />
        <div className="main-wrap-sec">
          {React.cloneElement(this.props.children)}
        </div>
        <br />
        {/* <AuthFooter /> */}
      </div>
    );
  }
}

export default EmptyLayout;
