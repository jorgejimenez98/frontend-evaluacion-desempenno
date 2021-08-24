import React from "react";
import WarningIcon from "@material-ui/icons/Warning";

import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";

function WarningAdminDeletionModal({
  showModal,
  closeModal,
  items,
  confirmDelete,
}) {
  const confirmDeleteAfterWarning = () => {
    closeModal();
    confirmDelete(items);
  };
  const callCloseModal = () => {
    closeModal();
  };

  return (
    <CModal
      show={showModal}
      onClose={() => callCloseModal()}
      size="lg"
      color="warning"
      centered
    >
      <CModalHeader closeButton>
        <CModalTitle>
          <WarningIcon /> Advertencia
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <h5 className="text-center">
          Tenga en cuenta que se ha seleccionado a usted mismo para{" "}
          <strong>eliminarse</strong>, en cuando presione el botón de{" "}
          <strong> confirmación</strong> será <strong>eliminado</strong> del
          sistema y por tanto automáticamente saldrá del mismo
        </h5>
      </CModalBody>
      <CModalFooter>
        <CButton
          color="primary"
          type="submit"
          onClick={confirmDeleteAfterWarning}
        >
          Si, confirmo la eliminación
        </CButton>{" "}
        <CButton color="secondary" onClick={() => callCloseModal()}>
          Cancelar
        </CButton>
      </CModalFooter>
    </CModal>
  );
}

export default WarningAdminDeletionModal;
