import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";

function DeleteOperatorModal({
  showModal,
  closeModal,
  deleteComfirmedItem,
  operatorName,
  workerName,
}) {
  return (
    <CModal
      show={showModal}
      onClose={() => closeModal()}
      color="danger"
      centered
    >
      <CModalHeader closeButton>
        <CModalTitle>Eliminar Operador</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <h6>
          Seguro q desea Eliminar el operador <strong>{operatorName}</strong> al
          trabajador <strong>{workerName}</strong>
        </h6>
      </CModalBody>
      <CModalFooter>
        <CButton
          color="danger"
          onClick={() => {
            closeModal();
            deleteComfirmedItem();
          }}
        >
          Sí, estoy seguro
        </CButton>{" "}
        <CButton color="secondary" onClick={() => closeModal()}>
          Cancelar
        </CButton>
      </CModalFooter>
    </CModal>
  );
}

export default DeleteOperatorModal;
