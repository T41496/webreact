import React, { useEffect } from "react";
import { connect } from "react-redux";

import { withNamespaces } from 'react-i18next';
  
const FaceError = (props) => {
  

  useEffect(() => {
      alert('Failed Try Again !!');
    window.location.assign("/document-upload");

     


  }, []);

  const { t } = props;

  return (
    <>
     <div>
       <p>{t("loading")}</p>
    </div>
    </>
  );
};

const mapStateToPros = (state) => ({
    yotiSession: state.yoti.yotiSession,

}
);

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToPros, mapDispatchToProps)(withNamespaces()(FaceError));
