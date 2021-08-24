import React from "react";
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CListGroup,
  CListGroupItem,
} from "@coreui/react";

function ImportModalConfirmPayTimes({
  showModal,
  closeModal,
  items,
  importComfirmedItems,
}) {
  return (
    <CModal
      show={showModal}
      onClose={() => closeModal()}
      color="info"
      centered
    >
      <CModalHeader closeButton>
        <CModalTitle>Importar Periódos de Pago</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CListGroup flush>
          {items.map((item, index) => (
            <CListGroupItem key={item.id_peri}>
              <h5>
                <strong>{index + 1}</strong> - {item.nombre} - {item.ejercicio} 
              </h5>
            </CListGroupItem>
          ))}
        </CListGroup>
        <p className="text-center">
          ¿Seguro que desea importar los Períodos de Pago seleccionados?
        </p>
      </CModalBody>
      <CModalFooter>
        <CButton
          color="info"
          onClick={() => {
            closeModal();
            importComfirmedItems(items);
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

export default ImportModalConfirmPayTimes;
