import React from "react";
import { Row, Col} from "react-bootstrap";
import { withNamespaces } from "react-i18next";

const BookmarkNoDataFound = (props) => {

  const { t } = props;
  
  return (
    <>
      <div className="bookmark-no-data-found-sec">
        <Row>
          <Col sm="12" md="12">
            <span> <i className="material-icons icon-bookmark">{t("bookmark_border")}</i></span>
            <p className="desc">{t("no_bookmarks_yet")}</p>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default withNamespaces()(BookmarkNoDataFound);
