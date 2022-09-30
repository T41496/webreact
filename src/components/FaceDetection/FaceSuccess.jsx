import React, { useEffect,useState } from "react";
import { connect, useSelector } from "react-redux";
import { Form, Button, Row, Col, Image } from "react-bootstrap";
import { withNamespaces } from 'react-i18next';
import {
   
    fetchYotiUserDetailsStart,
  } from "../../store/actions/YotiUserAction";
  
const FaceSuccess = (props) => {
  const [inputData, setInputData] = useState({});
  const [src, setSrc] = useState("");

  const [yotistate, setYotistate] = useState(true);

  const yotiSession = useSelector((state) => state.yoti.yotiSession);
  console.log(yotiSession)

  useEffect(() => {
     
    props.dispatch(fetchYotiUserDetailsStart({sessionId: localStorage.getItem("yoti_session_id")
}));


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

export default connect(mapStateToPros, mapDispatchToProps)(withNamespaces()(FaceSuccess));
