import React from "react";
import {Form, Button, Image, Modal} from "react-bootstrap";
import { withNamespaces } from 'react-i18next';

const ReportModeModal = (props) => {
  const { t } = props;
  return (
    <>
      <Modal
        className="modal-dialog-center report-modal"
        size="md"
        centered
        show={props.reportMode}
        onHide={props.closeReportModeModal}
      >
        <Form>
          <Modal.Header closeButton>
            <Modal.Title>{t("report_post")}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <div className="report-form">
                <Form>
                  <Form.Group>
                    <Form.Check
                        type="radio"
                        id="customControlAutosizing"
                        label="This content is offensive or violates ONLYFANS Terms of Services"
                        custom
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Check
                        type="radio"
                        id="customControlAutosizing"
                        label="This content contains stolen material (DMCA)"
                        custom
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Check
                        type="radio"
                        id="customControlAutosizing"
                        label="This content is spam"
                        custom
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Check
                        type="radio"
                        id="customControlAutosizing"
                        label="Report Abuse"
                        custom
                    />
                  </Form.Group>
                </Form>
              </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              type="button"
              className="btn btn-theme"
            >
              {t("cancel")}
            </Button>
            <Button
              type="button"
              className="btn btn-normal"
            >
              {t("report")}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default withNamespaces()(ReportModeModal);
