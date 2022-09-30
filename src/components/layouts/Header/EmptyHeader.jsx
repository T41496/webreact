import React from "react";
import { Link } from "react-router-dom";
import configuration from "react-global-configuration";
import { withNamespaces } from "react-i18next";

const EmptyHeader = () => {
  const { t } = this.props;
  return (
    <header className="header landing-sec">
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-icon"></span>
            <span className="navbar-icon"></span>
            <span className="navbar-icon"></span>
          </button>
          <a className="navbar-brand" href="/">
            <img
              src={configuration.get("configData.site_icon")}
              className="logo"
            />
          </a>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
              {localStorage.getItem("userLoginStatus") == "true" ? (
                <li className="nav-item active">
                  <Link className="nav-link smooth" to={"/dashboard"}>
                    {t("dashboard")}
                  </Link>
                </li>
              ) : (
                <>
                  <li className="nav-item active">
                    <Link className="nav-link smooth" to={"/login"}>
                      {t("login")}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link smooth" to={"/signup"}>
                      {t("register")}
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default withNamespaces()(EmptyHeader);
