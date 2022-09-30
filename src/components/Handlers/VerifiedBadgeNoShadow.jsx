import React from "react";
import { Image } from "react-bootstrap";
import configuration from "react-global-configuration";
import api from "../../Environment";
import { withNamespaces } from 'react-i18next';

const VerifiedBadgeNoShadow = (props) => {

  const { t } = props;

  return (
    <span className="verified-badge-sec no-shadow">
      <Image
        src={configuration.get('configData.verified_badge_file') ? (api.serviceUrl()+'/'+configuration.get('configData.verified_badge_file')) : ""}
        className="verified-dating"
        alt="verified-badge"
        title="Verified"
      />
      <span className="verified-info"></span>
    </span>
  );
};

export default withNamespaces()(VerifiedBadgeNoShadow);
