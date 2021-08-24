import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";

function NoAddErrorModal({ showModal, closeModal, year, workerName }) {
  return (
    <CModal show={showModal} onClose={() => closeModal()} color="info" centered>
      <CModalHeader closeButton>
        <CModalTitle>Información de seguridad</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <h6>
          No se puede realizar la Evaluación Anual del Trabajador{" "}
          <strong>{workerName}</strong> del año <strong>{year}</strong> porque
          estamos en el año <strong>{new Date().getFullYear()}</strong>
        </h6>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => closeModal()}>
          Ok, entendido
        </CButton>
      </CModalFooter>
    </CModal>
  );
}

export default NoAddErrorModal;
