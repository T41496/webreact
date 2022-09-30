import React from "react";
import {Form, Button, Image, Modal} from "react-bootstrap";
import { withNamespaces } from 'react-i18next';
import userLogoutStart from "../../store/actions/UserAction";

const LogoutModal = (props) => {

  const { t } = props;

  return (
    <>
      <Modal
        className="modal-dialog-center report-modal"
        size="md"
        centered
        show={props.isLogout}
        onHide={props.closeLogoutModal}
      >
        <Form>
          <Modal.Header closeButton>
            <Modal.Title>Logout</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <div className="">
                 <h4>Are you sure you want to log out ?</h4>
              </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              type="button"
              className="btn btn-danger"
              onClick={props.closeLogoutModal}
            >
              {t("no")}
            </Button>
            <Button
              type="button"
              className="btn btn-success"
              onClick={props.setLogoutModal}
            >
              {t("yes")}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default withNamespaces()(LogoutModal);
