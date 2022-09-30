import React, { Component } from 'react';
import configuration from "react-global-configuration";
import { Link } from "react-router-dom";
import { Form, Container, Row, Col, Media, Image, Dropdown, DropdownButton  } from "react-bootstrap";
import { withNamespaces } from 'react-i18next';



import i18n from '../../../i18n';
class MyComponent extends Component {

    state = {
        year: new Date().getFullYear()
    }

    render() {
        const changeLanguage = (lng) => {
            i18n.changeLanguage(lng);
          }

        const { t } = this.props;

        console.log("Footer-t", t);
        return (
            <>
                <footer className="new-footer-sec">
                    <Container>
                        <div className="footer-sec">
                            <Row>
                                <div className="resp-col-width resp-mrg-btn-xs" style={{marginTop:'15px'}}>
                                    <Col className="resp-col-width">
                                        <ul className="footer-link-sec list-unstyled" >
                                            <Media as="li">
                                                <Link to="/page/about">
                                                    {t('about')}
                                                </Link>
                                            </Media>
                                            <Media as="li">
                                                <Link to="/page/contact">
                                                    {t('contact')}
                                                </Link>
                                            </Media>
                                            <Media as="li">
                                                <Link to="page/privacy">
                                                    {t('privacy')}
                                                </Link>
                                            </Media>
                                            <Media as="li">
                                                <Link to="page/terms">
                                                    {t('terms')}
                                                </Link>
                                            </Media>
                                            <Media as="li">
                                                <Link to="page/help">
                                                    {t('help')}
                                                </Link>
                                            </Media>
                                            <Media as="li" style={{color:'#8a96a3'}}>
                                            <Image
                                                src="/assets/images/icons/globe.svg"
                                                className="svg-clone"
                                            />
                                            <div className="dropup" style={{paddingLeft:'0px'}}>
                                                <p className="dropbtn">{t('language')}</p>
                                                <div className="dropup-content">
                                                    <a type="button" onClick={() => changeLanguage('en')}>{t('english')}</a>
                                                    <a type="button" onClick={() => changeLanguage('sp')}>{t('spanish')}</a>
                                                </div>
                                            </div>
                                            </Media>
                                            
                                        </ul>
                                    </Col>
                                </div>
                                <div className="resp-col-width resp-mrg-btn-xs">
                                <ul className="footer-link-sec list-unstyled" >
                                    <div className="copyrights">
                                        <h4>
                                            {t("copyrights")} <strong style={{ "color": "#e85dbe" }}>{t("mysecrets")}</strong> {this.state.year}. All rights reserved.
                                        </h4>
                                    </div>
                                </ul>
                                </div>
                                <div className="resp-col-width resp-mrg-btn-xs">
                                    <ul className="footer-social-link-sec list-unstyled">
                                        <Media as="li" >
                                            <a href={configuration.get("configData.facebook_link")} target="_blank">
                                                <i className="fab fa-google"></i>
                                            </a>
                                        </Media>
                                        <Media as="li" >
                                            <a href={configuration.get("configData.facebook_link")} target="_blank">
                                                <i className="fab fa-facebook"></i>
                                            </a>
                                        </Media>
                                        <Media as="li">
                                            <a href={configuration.get("configData.instagram_link")}>
                                                <i className="fab fa-instagram"></i>
                                            </a>
                                        </Media>
                                        <Media as="li">
                                            <a href={configuration.get("configData.twitter_link")}>
                                                <i className="fab fa-twitter"></i>
                                            </a>
                                        </Media>
                                    </ul>

                                    <h4>@{t("mysecrets")} </h4>
                                </div>
                                
                                

                            </Row>
                        </div>
                    </Container>
                </footer>
            </>
        )
    }
}
export default withNamespaces()(MyComponent);