import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Container, Row, Col, Image } from "react-bootstrap";
import configuration from "react-global-configuration";
import { withNamespaces } from 'react-i18next';
import { connect } from "react-redux";
import api from "../../../Environment";
import "../LiveStream.css";
import {
  saveLiveStreamStart,
} from "../../../store/actions/PostAction";

const LiveStreamCreate = (props) => {
  const [inputData, setInputData] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(inputData);
    props.dispatch(
      saveLiveStreamStart({
        // description: inputData.content ? inputData.content : "",
        title: inputData.title ? inputData.title : "",
        access: inputData.access ? inputData.access : "Public",
        payment: inputData.payment ? inputData.payment : "Free",
        amount: inputData.amount ? inputData.amount : "",
        // coverImage: inputData.coverImage ? inputData.coverImage : "",
      })
    );
  };

  let fontstyle = {fontSize:"15px"}

  const { t } = props;

  return (
    <div className="notification-page create-post" id="tabs">
      <Container>
        <Form onSubmit={handleSubmit} enctype="multipart/form-data">
          <Row>
            <Col sm={12} md={12}>
              <div className="post-create-header">
                <div className="pull-left">
                  <Link className="bookmarkes-list notify-title" to={"/home"}>
                    <Image
                      src="assets/images/icons/back.svg"
                      className="svg-clone"
                    />
                    {t("live_stream")}
                  </Link>
                </div>
                <div className="pull-right">
                  <Button
                    style={{color:'#E85DBE'}}
                    type="submit"
                    className="post-btn btn-primary"
                    onClick={handleSubmit}
                  >
                    {t("create_stream")}
                  </Button>
                </div>
              </div>
            </Col>
            <Col sm={12} md={12}>
              <Form.Label style={fontstyle}>
                {t("livestream_title")}
              </Form.Label>
              <div className="">
                <Form.Group>
                  <Form.Control
                    type="text"
                    
                    placeholder={t("livestream_title_placeholder")}
                    name="title"
                    style={{ width: "100%", maxWidth: "100%", fontSize: "15px" }}
                    value={inputData.title ? inputData.title : null}
                    onChange={(event) =>
                      setInputData({
                        ...inputData,
                        title: event.currentTarget.value,
                      })
                    }
                  />
                </Form.Group>
              </div>
            </Col>
            {/* <Col sm={12} md={12}>
              <Form.Label>
                {t("livestream_content")}
              </Form.Label>
              <div className="create-post-textarea">
                <Form.Group>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder={t("livestream_content_placeholder")}
                    name="content"
                    style={{ width: "100%", maxWidth: "100%" }}
                    value={inputData.content ? inputData.content : null}
                    onChange={(event) =>
                      setInputData({
                        ...inputData,
                        content: event.currentTarget.value,
                      })
                    }
                  />
                </Form.Group>
              </div>
            </Col> */}
            {/* <Col sm={12} md={12}>
              <Form.Label>
                {t("cover_image")}
              </Form.Label>
              <div className="">
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label className="btn btn-primary" style={{ width: "30%", maxWidth: "30%" }}>{t("choose_file")}</Form.Label>
                  <Form.Control 
                    type="file" 
                    onChange={(event) =>
                      setInputData({
                        ...inputData,
                        coverImage: event.target.files[0],
                      })
                    }
                  />
                </Form.Group>
              </div>
            </Col> */}
            <br/><br/><br/>
            <Col sm={12} md={12}>
              <div className="create-post-textarea">
                <Form.Group>
                  <Form.Check
                    inline
                    label={t("call_public")}
                    name="access"
                    type="radio"
                    style={fontstyle}
                    id={`inline-access-radio-1`}
                    onChange={(event) =>
                      setInputData({
                        ...inputData,
                        access: 'Public',
                      })
                    }
                  />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Form.Check
                    inline
                    label={t("call_private")}
                    name="access"
                    type="radio"
                    style={fontstyle}
                    id={`inline-access-radio-2`}
                    onChange={(event) =>
                      setInputData({
                        ...inputData,
                        access: 'Private',
                      })
                    }
                  />
                </Form.Group>
              </div>
            </Col>
            <br/><br/><br/>
            <Col sm={12} md={12}>
              <div className="create-post-textarea">
                <Form.Group>
                  <Form.Check
                    inline
                    label={t("call_free")}
                    name="payment"
                    type="radio"
                    style={fontstyle}
                    id={`inline-radio-1`}
                    onChange={(event) =>
                      setInputData({
                        ...inputData,
                        payment: 'Free',
                      })
                    }
                  />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Form.Check
                    inline
                    label={t("call_paid")}
                    name="payment"
                    type="radio"
                    style={fontstyle}
                    id={`inline-radio-2`}
                    value={inputData.payment ? inputData.payment : null}
                    onChange={(event) =>
                      setInputData({
                        ...inputData,
                        payment: 'Paid',
                      })
                    }
                  />
                </Form.Group>
              </div>
            </Col>
            {(inputData.payment=="Paid")?
              <Col sm={12} md={12}>
                <Form.Label>
                  {t("amount")}
                </Form.Label>
                <div className="create-post-textarea">
                  <Form.Group>
                    <Form.Control
                      as="input"
                      type="number"
                      placeholder={t("amount")}
                      name="amount"
                      style={{ width: "100%", maxWidth: "100%" }}
                      value={inputData.amount ? inputData.amount : null}
                      onChange={(event) =>
                        setInputData({
                          ...inputData,
                          amount: event.currentTarget.value,
                        })
                      }
                    />
                  </Form.Group>
                </div>
              </Col>
            :
              null
            }
          </Row>
        </Form>
      </Container>
    </div>
  );
};

const mapStateToPros = (state) => ({

});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(withNamespaces()(LiveStreamCreate));
