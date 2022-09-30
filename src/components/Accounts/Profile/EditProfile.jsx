import React, { useEffect,useState } from "react";
import EditProfileCard from "./EditProfileCard";
import DeleteAccountCard from "./DeleteAccountCard";
import ChangePasswordCard from "./ChangePasswordCard";
import EditProfileTabSec from "./EditProfileTabSec";
import { connect } from "react-redux";
import {
  fetchUserDetailsStart,
  editUserDetails,
  updateUserDetailsStart,
} from "../../../store/actions/UserAction";
import { Container, Row, Col } from "react-bootstrap";
import { fetchYotiDetailsStart } from "../../../store/actions/YotiAction";
import { withNamespaces } from 'react-i18next';


const EditProfile = (props) => {
  const [activeSec, setActiveSec] = useState("profile-card");

  useEffect(() => {
    props.dispatch(fetchYotiDetailsStart());

  }, 
  []);

  const { t } = props;

  return (
    <div className="edit-profile">
      <Container>
        <Row>
          <Col sm={12} md={4}>
            <div className="vertical-menu edit-p">
              <div className="tab" role="tabpanel">
                <EditProfileTabSec
                  activeSec={activeSec}
                  setActiveSec={setActiveSec}
                />
              </div>
            </div>
          </Col>
          <Col md={8} sm={12}>
            <div className="tab-content tabs">
              <EditProfileCard
                activeSec={activeSec}
                setActiveSec={setActiveSec}
              />

              <ChangePasswordCard
                activeSec={activeSec}
                setActiveSec={setActiveSec}
              />

              <DeleteAccountCard
                activeSec={activeSec}
                setActiveSec={setActiveSec}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const mapStateToPros = (state) => ({
  userData: state.users,
  yoti_session: state.yotiSession,

});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToPros, mapDispatchToProps)(withNamespaces()(EditProfile));
