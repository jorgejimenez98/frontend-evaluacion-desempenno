import React from "react";
import StoreFrontIcon from "@material-ui/icons/Storefront";
import FastFoodIcon from "@material-ui/icons/Fastfood";
import { HiUserGroup, FaDollarSign } from "react-icons/all";
import { CWidgetDropdown, CRow, CCol } from "@coreui/react";

const WidgetsDropdown = ({ users, salePlaces, families, salePlans }) => {
  return (
    <CRow>
      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-primary"
          header={users}
          text="Usuarios del Sistema"
          className="pb-3"
        >
          <HiUserGroup size={24} />
        </CWidgetDropdown>
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-info"
          header={salePlaces}
          text="Puntos de Ventas"
          className="pb-3"
        >
          <StoreFrontIcon />
        </CWidgetDropdown>
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-warning"
          header={families}
          text="Familias registradas"
          className="pb-3"
        >
          <FastFoodIcon />
        </CWidgetDropdown>
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-danger"
          header={salePlans}
          text="Planes de Venta registrados"
          className="pb-3"
        >
          <FaDollarSign size={22}/>
        </CWidgetDropdown>
      </CCol>
    </CRow>
  );
};

export default WidgetsDropdown;
