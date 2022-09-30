import React from "react";
import { Row, Col, Image } from "react-bootstrap";
import configuration from "react-global-configuration";
import api from "../../Environment";

const NoDataFound = () => {
  return (
    <>
      <div className="no-data-found-sec">
        <Row>
          <Col sm="12" md="12">
            <div className="no-data-found-img-sec">
              <Image
                alt="not-found"
                src={
                  configuration.get("configData.frontend_no_data_image")
                    ? api.serviceUrl()+'/'+configuration.get("configData.frontend_no_data_image")
                    : window.location.origin +
                      "/assets/images/no-data-found-2.svg"
                }
              />
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default NoDataFound;
