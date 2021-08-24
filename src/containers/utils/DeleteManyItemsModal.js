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

function DeleteManyItemsModal({
  showModal,
  closeModal,
  objectType,
  items,
  deleteComfirmedItems,
}) {
  return (
    <CModal
      show={showModal}
      onClose={() => closeModal()}
      color="danger"
      centered
    >
      <CModalHeader closeButton>
        <CModalTitle>Eliminar {objectType}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CListGroup flush>
          {items.map((item, index) => (
            <CListGroupItem
              key={
                objectType === "Familia(s)"
                  ? item.id_grupo
                  : objectType === "Punto de venta(s)"
                  ? item.id_pvta
                  : objectType === "Trabajador(es)"
                  ? item.no_interno
                  : item.id
              }
            >
              <h5>
                <strong>{index + 1}</strong> -{" "}
                {objectType === "Usuario(s)" && item.username}
                {objectType === "Hotel(es)" && item.name}
                {objectType === "Familia(s)" && item.desc_grupo}
                {objectType === "Punto de venta(s)" && item.desc_pvta}
                {objectType === "Trabajador(es)" && item.nombreCompleto}
                {objectType === "Plan de Ventas(es)" && (item.year)}
                {objectType === "Planes de venta Mensuales(s)" && (item.month + "  - " + item.family + " - " + item.saleArea)}
                {objectType === "Planes de venta Anual(es)" && ("Plan del " + item.year )}
                {objectType === "Períodos de Pago" && ("Período del " + item.year  + " " + item.month)}
              </h5>
            </CListGroupItem>
          ))}
        </CListGroup>

        <p className="text-center">
          Seguro que desea eliminar a los <strong>{objectType}</strong>
        </p>
      </CModalBody>
      <CModalFooter>
        <CButton
          color="danger"
          onClick={() => {
            closeModal();
            deleteComfirmedItems(items);
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

export default DeleteManyItemsModal;
