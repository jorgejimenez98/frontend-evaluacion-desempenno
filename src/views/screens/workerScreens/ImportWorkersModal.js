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

function ImportWorkersModal({
  showModal,
  closeModal,
  items,
  importComfirmedItems,
  hotelName,
}) {
  return (
    <CModal show={showModal} onClose={() => closeModal()} color="info" centered>
      <CModalHeader closeButton>
        <CModalTitle>Importar Trabajadores del ({hotelName})</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CListGroup flush>
          {items.map((item, index) => (
            <CListGroupItem key={item.no_interno}>
              <h5>
                <strong>{index + 1}</strong> - {item.nombre} {item.apell1}{" "}
                {item.apell2}
              </h5>
            </CListGroupItem>
          ))}
        </CListGroup>
        <p className="text-center">
          ¿Seguro que desea importar los Trabajadores seleccionados?
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

export default ImportWorkersModal;
