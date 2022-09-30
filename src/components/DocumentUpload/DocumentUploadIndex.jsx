import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Image,
  FormGroup,
} from "react-bootstrap";
import "./DocumentUploadIndex.css";
import { connect } from "react-redux";
import {
  addKycDocumentStart,
  getKycDocumentStart,
} from "../../store/actions/KycDocumentAction";

import NoDataFound from "../NoDataFound/NoDataFound";
import DocumentUploadLoader from "../Loader/DocumentUploadLoader";
import { withNamespaces } from 'react-i18next';
import api from "../../Environment";

const DocumentUploadIndex = (props) => {
  useEffect(() => {
    props.dispatch(getKycDocumentStart());
  }, []);

  const [inputData, setInputData] = useState({});

  const [image, setImage] = useState({});

  const [uploadDocumentID, setUploadDocumentID] = useState(null);

  const [documents, setDocuments] = useState([]);

  const handleChangeImage = (event, doc) => {
    if (event.currentTarget.type === "file") {
      documents[doc.document_id] = event.currentTarget.files[0];
      let reader = new FileReader();
      let file = event.currentTarget.files[0];
      reader.onloadend = () => {
        setImage({ ...image, [doc.document_id]: reader.result });
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    }
  };

  const handleSubmit = (event, doc) => {
    event.preventDefault();
    setUploadDocumentID(doc.document_id);
    props.dispatch(addKycDocumentStart({
        document_file: ((documents.length > 0 && documents[doc.document_id]) ? documents[doc.document_id] : ''),
        document_id: ((documents.length > 0 && documents[doc.document_id]) ? doc.document_id : 0),
      }));
  };

  const { t } = props;

  return (
    <>
      <div className="document-upload-sec">
        <Container>
          <h4 className="head-title" >{t("face_authentication")}</h4>
          {props.kycDocDetails.loading ? (
            ""
          ) : (
            <>
              {/* {props.profile.data.is_face == 1 ? 

              <h3 className="mb-10 text-info">Face Id has been verified</h3> :  */}
              {(props.profile.data.is_face == 2) ?
              <h3 className="mb-10 text-info">Face ID verification is in progress</h3> : '' }
            </>
          )}

          {/* faceid start*/}
          {props.profile.data.is_face == 1 ? 
         <h1 className="primary-btn" style={{color: "green"}}>Face Id has been verified</h1>
          :(props.profile.data.is_face == 2) ? <h1  className="primary-btn" style={{color: "red"}}>We are verifying your documents </h1>
          :<div className="upload-alert-page"><Link to="/face-detection"  className="primary-btn" ><span  style={{ "fontSize":"15px" }}>{t("document_upload")}</span></Link></div>
        
        }

          {/* faceid end */}
          {/* {props.kycDocDetails.loading ? (
            <DocumentUploadLoader></DocumentUploadLoader>
          ) : props.kycDocDetails.data.documents.length > 0 ? (
            props.kycDocDetails.data.documents.map((doc) => (
              <>
                <div className="document-card">
                  <Row>
                    <Col sm={12} md={12}>
                      <div className="sub-heading">
                        <h4>{doc.name}</h4>
                        <p>{doc.description}</p>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    {doc.is_delete_edit_option ? (
                      <Col sm={12} md={6} xl={6} className="resp-mrg-btn-xs">
                        <div className="document-upload-box">
                          <Image src={api.serviceUrl()+'/'+doc.picture} className="doc-upload-img" />
                        </div>
                      </Col>
                    ) : (
                      ""
                    )}
                    <Col sm={12} md={6} xl={6}>
                      <FormGroup>
                        {doc.is_delete_edit_option ? (
                          <Form.File
                            type="file"
                            id={doc.document_id}
                            name={doc.document_id}
                            onChange={(event) => handleChangeImage(event, doc)}
                            accept="image/*"
                          />
                        ) : null}
                        <Form.Label
                          htmlFor={doc.document_id}
                          className="document-upload-box-1"
                        >
                          <Image
                            src={
                              image[doc.document_id] !== undefined
                                ? image[doc.document_id]
                                : doc.user_document.document_file !== undefined
                                ? api.serviceUrl()+'/'+doc.user_document.document_file
                                : window.location.origin +
                                  "/assets/images/document-upload.svg"
                            }
                            className="doc-upload-img-1"
                          />
                          <br></br>
                          <p className="document-desc">
                            {doc.is_delete_edit_option
                              ? t("click_here_to_upload")
                              : null}
                          </p>
                        </Form.Label>
                      </FormGroup>
                    </Col>
                  </Row>
                  {doc.is_delete_edit_option ? (
                    <Row>
                      <Col sm={12} md={12}>
                        <Button
                          className="receive-btn-blue"
                          onClick={(event) => handleSubmit(event, doc)}
                          disabled={doc.is_delete_edit_option ? false : true}
                        >
                          {uploadDocumentID === doc.document_id
                            ? props.addKycDocInput.loadingButtonContent
                            : t("send_for_approval")}
                        </Button>
                      </Col>
                    </Row>
                  ) : (
                    ""
                  )}
                </div>
                <div className="space-mg"></div>
              </>
            ))
          ) : (
            <NoDataFound></NoDataFound>
          )} */}
        </Container>
      </div>
    </>
  );
};

const mapStateToPros = (state) => ({
  kycDocDetails: state.kycDocument.kycDocDetails,
  addKycDocInput: state.kycDocument.addKycDocInput,
  profile: state.users.profile,

});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(withNamespaces()(DocumentUploadIndex));
