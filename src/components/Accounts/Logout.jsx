import React, { useEffect,useState } from "react";
import userLogoutStart from "../../store/actions/UserAction";
import { connect } from "react-redux";
import { withNamespaces } from 'react-i18next';
import LogoutModal from "../helper/LogoutModal";

const Logout = (props) => {

  const [isLogout, setIsLogout] = useState(true);

  const closeLogoutModal = () => {
    setIsLogout(false);
    props.history.push("/home");
  };

  const setLogoutModal = () => {
    setIsLogout(false);
    props.dispatch(userLogoutStart());
    window.location.replace("/");
    //props.history.push("/");
  };

  useEffect(() => {
    // props.dispatch(userLogoutStart());
    // props.history.push("/");
  }, []);

  const { t } = props;
  return (
    <LogoutModal isLogout={isLogout} closeLogoutModal={closeLogoutModal} setLogoutModal={setLogoutModal}/>
  );
};

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapDispatchToProps
)(withNamespaces()(Logout));
