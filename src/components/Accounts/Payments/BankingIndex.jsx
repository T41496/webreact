import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Form, Button, Container, Row, Col, Image } from "react-bootstrap";
import "./BankingIndex.css";
import { getKycDocumentStart } from "../../../store/actions/KycDocumentAction";
import { withNamespaces } from 'react-i18next';

const BankingIndex = (props) => {
  useEffect(() => {
    props.dispatch(getKycDocumentStart());
  }, []);

  const { t } = props;

  return (
    <div className="banking-sec">
      <Container>
        <Row>
          <Col sm={12} md={12}>
            <div className="banking-header">
              <div className="back-icon">
                {/* <Image
                  src="/assets/images/icons/back.svg"
                  className="svg-clone"
                /> */}
                <span>{t("banking")}</span>
              </div>
              <div className="help-icon">
                <Image
                  src="/assets/images/icons/help.svg"
                  className="svg-clone"
                />
              </div>
            </div>
            <div className="banking-body">
              <Form className="banking-personal-form">
                <h2 className="title">{t("personal_information")}</h2>
                <h4>
                  {t("personal_information_para")}
                </h4>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>{t("first_name")}</Form.Label>
                  <Form.Control type="fname" placeholder={t("first_name")} />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>{t("last_name")}</Form.Label>
                  <Form.Control type="lname" placeholder={t("last_name")} />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>{t("country")}</Form.Label>
                  <Form.Control
                    type="email"
                    value="United Kingdom"
                    placeholder=""
                  />
                  <Form.Text className="text-muted">
                    {t("customer_support_para")}{" "}
                    <Link to="#">{t("customer_support")}</Link>
                  </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>{t("address")}</Form.Label>
                  <Form.Control type="address" placeholder={t("your_address")} />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>{t("city")}</Form.Label>
                  <Form.Control type="city" placeholder={t("your_city")} />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>{t("postal_zip")}</Form.Label>
                  <Form.Control type="pcode" placeholder={t("postal_zip")} />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>
                    {t("twitter")} <span>({t("optional")})</span>
                  </Form.Label>
                  <Form.Control type="lname" placeholder={t("twitter")} />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>
                    {t("instagaram")} <span>({t("optional")})</span>
                  </Form.Label>
                  <Form.Control type="lname" placeholder={t("instagaram")} />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>
                    {t("website")} <span>({t("optional")})</span>
                  </Form.Label>
                  <Form.Control type="lname" placeholder={t("website")} />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>
                    {t("dob")} <span>({t("optional")})</span>
                  </Form.Label>
                  <Form.Control type="dob" placeholder={t("dob")} />
                </Form.Group>
                <Form.Group>
                  <Form.Label>{t("document_type")}</Form.Label>
                  <Form.Control
                    as="select"
                    className="mr-sm-2"
                    id="inlineFormCustomSelect"
                    custom
                  >
                    <option value="0">{t("choose")}</option>
                    <option value="1">{t("one")}</option>
                    <option value="2">{t("two")}</option>
                    <option value="3">{t("three")}</option>
                  </Form.Control>
                </Form.Group>
                <Form.Row>
                  <Col sm={12}>
                    <Form.Group className="upload-btn-wrapper">
                      <Form.Label>{t("select_file_para")}</Form.Label>
                      <button className="btn-upload">{t("select_file")}</button>
                      <Form.File
                        id="exampleFormControlFile1"
                        label=""
                        accept="image/*"
                      />
                      <Form.Text className="text-muted">
                        {t("select_file_para2")}
                      </Form.Text>
                    </Form.Group>
                  </Col>
                  <Col sm={4}></Col>
                </Form.Row>
                <Form.Row>
                  <Col sm={12}>
                    <Form.Group className="upload-btn-wrapper">
                      <Form.Label>{t("select_file_para3")}</Form.Label>
                      <button className="btn-upload">{t("select_file")}</button>
                      <Form.File
                        id="exampleFormControlFile1"
                        label=""
                        accept="image/*"
                      />
                      <Form.Text className="text-muted">
                        {t("select_file_para4")}
                      </Form.Text>
                    </Form.Group>
                  </Col>
                  <Col sm={4}></Col>
                </Form.Row>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>
                    {t("id_expiration_date")} <span>{t("optional")}</span>
                  </Form.Label>
                  <Form.Control
                    type="address"
                    placeholder="ID expiration date"
                  />
                </Form.Group>
                <Form.Group>
                  {["radio"].map((type) => (
                    <div key={`custom-inline-${type}`}>
                      <Form.Check
                        custom
                        inline
                        label="No expiration date"
                        type={type}
                        id={`custom-inline-${type}-1`}
                      />
                    </div>
                  ))}
                </Form.Group>
                <Form.Group>
                  <Form.Label className="mb-4 mt-2">
                    {t("explicity_content")}<span>({t("optional")})</span>
                  </Form.Label>
                  {["radio"].map((type) => (
                    <div key={`custom-inline-${type}`}>
                      <Form.Check
                        custom
                        inline
                        label="Will you be posting sexually explicity / pornographic content"
                        type={type}
                        id={`custom-inline-${type}-2`}
                      />
                    </div>
                  ))}
                </Form.Group>
                <div className="edit-save">
                  <Button className="save-btn"> {t("send_for_approval")} </Button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const mapStateToPros = (state) => ({
  kycDocDetails: state.kycDocument.kycDocDetails,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToPros, mapDispatchToProps)(withNamespaces()(BankingIndex));
