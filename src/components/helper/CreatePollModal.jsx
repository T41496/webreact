import React from "react";
import { withNamespaces } from 'react-i18next';

const CreatePollModal = () => {

  const { t } = this.props;

  return (
    <div className="modal fade" id="pollDuration">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <div className="left-half">
              <p className="poll-model-title">{t("poll_duration")}</p>
            </div>
            <div className="right-half">
              {" "}
              <p className="poll-days">7 {t("days")}</p>
            </div>
          </div>

          <div className="modal-body">
            <div className="b-make-post__expire-wrapper">
              <div className="b-make-post__expire__item">
                <input
                  id="ModalPollDuration0"
                  type="radio"
                  className="b-make-post__expire__input"
                  value="1"
                />
                <label
                  for="ModalPollDuration0"
                  className="b-make-post__expire__label"
                >
                  <span className="g-first-letter">1</span> {t("day")}
                </label>
              </div>
              <div className="b-make-post__expire__item">
                <input
                  id="ModalPollDuration1"
                  type="radio"
                  className="b-make-post__expire__input"
                  value="3"
                />
                <label
                  for="ModalPollDuration1"
                  className="b-make-post__expire__label"
                >
                  <span className="g-first-letter">3</span> {t("days")}
                </label>
              </div>
              <div className="b-make-post__expire__item">
                <input
                  id="ModalPollDuration2"
                  type="radio"
                  className="b-make-post__expire__input"
                  value="7"
                />
                <label
                  for="ModalPollDuration2"
                  className="b-make-post__expire__label"
                >
                  <span className="g-first-letter">7</span> {t("days")}
                </label>
              </div>
              <div className="b-make-post__expire__item">
                <input
                  id="ModalPollDuration3"
                  type="radio"
                  className="b-make-post__expire__input"
                  value="30"
                />
                <label
                  for="ModalPollDuration3"
                  className="b-make-post__expire__label"
                >
                  <span className="g-first-letter">30</span> {t("days")}
                </label>
              </div>
              <div className="b-make-post__expire__item">
                <input
                  id="ModalPollDuration4"
                  type="radio"
                  className="b-make-post__expire__input"
                  value="0"
                />
                <label
                  for="ModalPollDuration4"
                  className="b-make-post__expire__label"
                >
                  <span>
                    <span className="g-first-letter">N</span>o {t("limit")}
                  </span>
                </label>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="simple-btn" data-dismiss="modal">
              {t("cancel")}
            </button>
            <button type="button" className="simple-btn">
              {t("save")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withNamespaces()(CreatePollModal);
