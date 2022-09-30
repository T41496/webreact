import React from "react";
import { Link } from "react-router-dom";
import { Image, Media } from "react-bootstrap";
import { withNamespaces } from 'react-i18next';

const EditProfileTabSec = (props) => {

  const { t } = props;

  return (
    <ul className="nav nav-tabs edit-profile-tabs" role="tablist">
      <Media
        as="li"
        role="presentation"
        className={props.activeSec === "settings-card" ? "active" : ""}
      >
        <Link
          to={"/profile"}
          className="bookmarkes-list"
          // aria-controls="profile"
          // role="tab"
          // data-toggle="tab"
          // onClick={() => props.setActiveSec("settings-card")}
        >
          <Image src="/assets/images/icons/back.svg" className="svg-clone" />
          {t("settings")}
        </Link>
      </Media>
      <Media
        as="li"
        role="presentation"
        className={props.activeSec === "profile-card" ? "active" : ""}
      >
        <Link
          to="#Section2"
          aria-controls="profile"
          role="tab"
          className="bookmarkes-list"
          data-toggle="tab"
          onClick={() => props.setActiveSec("profile-card")}
        >
          <Image src="/assets/images/icons/profile.svg" className="svg-clone" />
          {t("profile")}
        </Link>
      </Media>
      {(localStorage.getItem('login_by') == 'manual') ? 
      <Media
        as="li"
        role="presentation"
        className={props.activeSec === "change-password-card" ? "active" : ""}
      >
        <Link
          to="#Section3"
          aria-controls="profile"
          role="tab"
          className="bookmarkes-list"
          data-toggle="tab"
          onClick={() => props.setActiveSec("change-password-card")}
        >
          <Image src="/assets/images/icons/change-1.svg" className="svg-clone" />
          {t("change_password")}
        </Link>
      </Media>
      : ''}
      <Media
        as="li"
        role="presentation"
        className={props.activeSec === "delete-account-card" ? "active" : ""}
      >
        <Link
          to="#Section4"
          aria-controls="profile"
          role="tab"
          className="bookmarkes-list"
          data-toggle="tab"
          onClick={() => props.setActiveSec("delete-account-card")}
        >
          <Image src="/assets/images/icons/delete.svg" className="svg-clone" />
          {t("delete_account")}
        </Link>
      </Media>
      <Media
        as="li"
        role="presentation"
        className={props.activeSec === "account-card" ? "active" : ""}
      >
        <Link
          to={"/add-bank"}
          aria-controls="profile"
          role="presentation"
          className="bookmarkes-list"
        >
          <Image src="/assets/images/icons/account.svg" className="svg-clone" />
          {t("add_bank")}
        </Link>
      </Media>

      <Media
        as="li"
        role="presentation"
        className={props.activeSec === "notifications-card" ? "active" : ""}
      >
        <Link
          to={"/payments"}
          aria-controls="profile"
          role="presentation"
          className="bookmarkes-list"
        >
          <Image
            src="/assets/images/icons/notification.svg"
            className="svg-clone"
          />
          {t("payments")}
        </Link>
      </Media>
      <Media
        as="li"
        role="presentation"
        className={props.activeSec === "security-card" ? "active" : ""}
      >
        <Link to={`/document-upload`} className="bookmarkes-list">
          <Image src="/assets/images/icons/security.svg" className="svg-clone" />
          {t("documents")}
        </Link>
      </Media>
      <Media
        as="li"
        role="presentation"
        className={props.activeSec === "bank-accounts" ? "active" : ""}
      >
        <Link to={`/billing-accounts`} className="bookmarkes-list">
          <Image src="/assets/images/icons/bank.svg" className="svg-clone" />
          {t("bank_accounts")}
        </Link>
      </Media>
    </ul>
  );
};

export default withNamespaces()(EditProfileTabSec);
