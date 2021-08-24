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

function ImportModalConfirmSellArea({
  showModal,
  closeModal,
  items,
  importComfirmedItems,
  hotelName
}) {
  return (
    <CModal
      show={showModal}
      onClose={() => closeModal()}
      color="info"
      centered
    >
      <CModalHeader closeButton>
        <CModalTitle>Importar Puntos de Venta ({hotelName})</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CListGroup flush>
          {items.map((item, index) => (
            <CListGroupItem key={item.id_pvta}>
              <h5>
                <strong>{index + 1}</strong> - {item.desc_pvta}
              </h5>
            </CListGroupItem>
          ))}
        </CListGroup>
        <p className="text-center">
          ¿Seguro que desea importar los Puntos de Venta seleccionados?
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

export default ImportModalConfirmSellArea;
