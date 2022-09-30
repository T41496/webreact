import React, { Component } from "react";
import configuration from "react-global-configuration";
import { Link } from "react-router-dom";
import { Form, Container, Row, Col, Dropdown, Media } from "react-bootstrap";
import { withNamespaces } from "react-i18next";

import {
  setTranslations,
  setDefaultLanguage,
  setLanguage,
  getLanguage,
} from "react-multi-lang";
// import en from "../../../assets/translations/en.json";
// import es from "../../../assets/translations/es.json";

class AuthFooter extends Component {
  handleChangeLang = ({ currentTarget: input }) => {
    console.log(input.value);
    setLanguage(input.value);
    localStorage.setItem("lang", input.value);
    // window.location.reload();
  };

  

  render() {
    const { t } = this.props;
    return (
      <>
        <footer>
          <Container>
            <div className="footer-section">
              <Row>
                <Col sm={12} xs={12} xl={4} lg={4} md={12}>
                  <ul className="list-inline">
                    <Media as="li" key="copy-key">
                      <Link to="#">
                        {configuration.get("configData.copyright_content")}
                      </Link>
                    </Media>
                  </ul>
                </Col>
                <Col sm={12} xs={12} xl={6} lg={6} md={12}>
                  <ul className="list-inline">
                    {configuration
                      .get("configData.footer_pages1")
                      .map((static_page, index) => (
                        <Media
                          as="li"
                          key={"sp-" + static_page.static_page_unique_id}
                        >
                          <Link
                            to={`/page/${static_page.static_page_unique_id}`}
                            key={static_page.static_page_unique_id}
                          >
                            {static_page.title}
                          </Link>
                        </Media>
                      ))}
                  </ul>
                </Col>
                <Col sm={12} xs={12} xl={6} lg={6} md={12}>
                  <ul className="list-inline">
                    {configuration
                      .get("configData.footer_pages2")
                      .map((static_page, index) => (
                        <Media
                          as="li"
                          key={"sp-" + static_page.static_page_unique_id}
                        >
                          <Link
                            to={`/page/${static_page.static_page_unique_id}`}
                            key={static_page.static_page_unique_id}
                          >
                            {static_page.title}
                          </Link>
                        </Media>
                      ))}
                  </ul>
                </Col>
                {/* <Col sm={12} xs={12} xl={2} lg={2} md={12}>
                  <Dropdown className="country-sec" style={{ display: "none" }}>
                    <Dropdown.Toggle
                      className="btn btn-default dropdown-toggle countrySelect"
                      type="button"
                      id="dropdown-basic"
                    >
                      <i className="fa fa-globe mr-2"></i>
                      <span>{t("english")}</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="dropdown-menu dropdown-menu-right mobile-popup model-filter-dropdown">
                      <Form className="pop-ups-bg">
                        <Media as="li" key="language-en">
                          <a>
                            {["radio"].map((type) => (
                              <div key={`custom-inline-${type}`}>
                                <Form.Check
                                  custom
                                  inline
                                  label="English"
                                  type={type}
                                  id={`custom-inline-${type}-1`}
                                />
                              </div>
                            ))}
                          </a>
                        </Media>
                        <Media as="li" key="language-sp">
                          <a>
                            {["radio"].map((type) => (
                              <div key={`custom-inline-${type}`}>
                                <Form.Check
                                  custom
                                  inline
                                  label="Indian"
                                  type={type}
                                  id={`custom-inline-${type}-2`}
                                />
                              </div>
                            ))}
                          </a>
                        </Media>
                        <Media as="li">
                          <a>
                            {["radio"].map((type) => (
                              <div key={`custom-inline-${type}`}>
                                <Form.Check
                                  custom
                                  inline
                                  label="Chinese Simplified"
                                  type={type}
                                  id={`custom-inline-${type}-3`}
                                />
                              </div>
                            ))}
                          </a>
                        </Media>
                        <Media as="li">
                          <a>
                            {["radio"].map((type) => (
                              <div key={`custom-inline-${type}`}>
                                <Form.Check
                                  custom
                                  inline
                                  label="Chinese Traditional"
                                  type={type}
                                  id={`custom-inline-${type}-4`}
                                />
                              </div>
                            ))}
                          </a>
                        </Media>
                        <Media as="li">
                          <a>
                            {["radio"].map((type) => (
                              <div key={`custom-inline-${type}`}>
                                <Form.Check
                                  custom
                                  inline
                                  label="Korean"
                                  type={type}
                                  id={`custom-inline-${type}-5`}
                                />
                              </div>
                            ))}
                          </a>
                        </Media>
                        <Media as="li">
                          <a>
                            {["radio"].map((type) => (
                              <div key={`custom-inline-${type}`}>
                                <Form.Check
                                  custom
                                  inline
                                  label="Italian"
                                  type={type}
                                  id={`custom-inline-${type}-6`}
                                />
                              </div>
                            ))}
                          </a>
                        </Media>
                        <Media as="li">
                          <a>
                            {["radio"].map((type) => (
                              <div key={`custom-inline-${type}`}>
                                <Form.Check
                                  custom
                                  inline
                                  label="Japanese"
                                  type={type}
                                  id={`custom-inline-${type}-7`}
                                />
                              </div>
                            ))}
                          </a>
                        </Media>
                      </Form>
                    </Dropdown.Menu>
                  </Dropdown>

                  {configuration.get("configData.is_multilanguage_enabled") ==
                  1 ? (
                    <div className="select-lang-drop-down">
                      <select
                        className="form-control mw-200 mb-3"
                        onChange={this.handleChangeLang}
                        name="lang"
                      >
                        <option
                          value="en"
                          selected={
                            localStorage.getItem("lang") == "en" ? true : false
                          }
                        >
                          {t("english")}
                        </option>
                        <option
                          value="es"
                          selected={
                            localStorage.getItem("lang") == "es" ? true : false
                          }
                        >
                          {t("spanish")}
                        </option>
                      </select>
                    </div>
                  ) : (
                    ""
                  )}
                </Col> */}
              </Row>
            </div>
          </Container>
        </footer>
      </>
    );
  }
}

export default withNamespaces()(AuthFooter);
