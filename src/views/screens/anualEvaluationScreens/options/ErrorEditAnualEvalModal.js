import {
    CButton,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
  } from "@coreui/react";
  
  function ErrorEditAnualEvalModal({
    showModal,
    closeModal,
    evalDate,
    differenceDays,
    workerName,
  }) {
    return (
      <CModal show={showModal} onClose={() => closeModal()} color="info" centered>
        <CModalHeader closeButton>
          <CModalTitle>Información de seguridad</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <h6>
            No se puede editar la Evaluación Anual del Trabajador{" "}
            <strong>{workerName}</strong> porque ya han pasado{" "}
            <strong>{differenceDays} días</strong> desde que de realizó la
            evaluación, se hizo el <strong>{evalDate}</strong> y la fecha de hoy
            es <strong>{new Date().toLocaleDateString()}</strong>
          </h6>
          <small>
            Solo se puede editar la Evaluación Anual antes de que
            se cumplan 7 días de creada
          </small>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => closeModal()}>
            Ok, entendido
          </CButton>
        </CModalFooter>
      </CModal>
    );
  }
  
  export default ErrorEditAnualEvalModal;
  