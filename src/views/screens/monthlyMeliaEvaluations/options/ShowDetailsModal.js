import React from "react";
import { CBadge } from "@coreui/react";
import { steps as detailsStep } from "../../monthlyEvaluationScreens/options/steps";
import { stepContent } from "../../monthlyEvaluationScreens/options/stepContent";
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import {
  FormControlLabel,
  Radio,
  RadioGroup,
  FormControl,
} from "@material-ui/core";

function ShowDetailsModal({ showModal, closeModal, index, detailValue }) {
  return (
    <CModal
      show={showModal}
      onClose={() => closeModal()}
      color="info"
      centered
      size="xl"
    >
      <CModalHeader closeButton>
        <CModalTitle>{detailsStep[index - 1]?.text}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <FormControl
          component="fieldset"
          style={{ width: "100%" }}
          disabled
        >
          <RadioGroup value={detailValue}>
            <div className="row">
              <div className="col-md-1 text-center mr-n4 pt-1">
                <CBadge color="danger" className="mt-2">
                  M
                </CBadge>
              </div>
              <div className="col-md-11">
                <FormControlLabel
                  value={stepContent[index - 1]?.value1}
                  control={<Radio />}
                  label={stepContent[index - 1]?.label1}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-1 text-center mr-n4 pt-1">
                <CBadge color="warning" className="mt-2">
                  R
                </CBadge>
              </div>
              <div className="col-md-11">
                <FormControlLabel
                  value={stepContent[index - 1]?.value2}
                  control={<Radio />}
                  label={stepContent[index - 1]?.label2}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-1 text-center mr-n4 pt-1">
                <CBadge color="info" className="mt-2">
                  B
                </CBadge>
              </div>
              <div className="col-md-11">
                <FormControlLabel
                  value={stepContent[index - 1]?.value3}
                  control={<Radio />}
                  label={stepContent[index - 1]?.label3}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-1 text-center mr-n4 pt-1">
                <CBadge color="success" className="mt-2">
                  MB
                </CBadge>
              </div>
              <div className="col-md-11">
                <FormControlLabel
                  value={stepContent[index - 1]?.value4}
                  control={<Radio />}
                  label={stepContent[index - 1]?.label4}
                />
              </div>
            </div>
          </RadioGroup>
        </FormControl>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => closeModal()}>
          Cerrar
        </CButton>
      </CModalFooter>
    </CModal>
  );
}

export default ShowDetailsModal;
