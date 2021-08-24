import React from "react";
import { CFormGroup, CLabel, CCol, CBadge } from "@coreui/react";

function HeaderForm({ year, worker, dateCreation }) {
  return (
    <div>
      <div>
        {/* ANNOO */}
        <CFormGroup row>
          <CCol md="3">
            <CLabel>Año de Evaluación</CLabel>
          </CCol>
          <CCol xs="12" md="9">
            <h5>{year}</h5>
          </CCol>
        </CFormGroup>
        {/* FECHA de CREACION*/}
        <CFormGroup row>
          <CCol md="3">
            <CLabel>Fecha de Creación</CLabel>
          </CCol>
          <CCol xs="12" md="9">
            <h6>{dateCreation}</h6>
          </CCol>
        </CFormGroup>
        <hr />

        {/* TRABAJADOR A EVALUAR */}
        <CFormGroup row>
          <CCol md="3">
            <CLabel>Nombre del Trabajador a evaluar</CLabel>
          </CCol>
          <CCol xs="12" md="9">
            <h6>{worker?.nombreCompleto}</h6>
          </CCol>
        </CFormGroup>

        {/* Cargo  del  TRABAJADOR*/}
        <CFormGroup row className="mt-n2">
          <CCol md="3">
            <CLabel>Cargo que ocupa el trabajador a evaluar</CLabel>
          </CCol>
          <CCol xs="12" md="9">
            <h5>
              <CBadge color='info'>{worker?.cargo}</CBadge>
            </h5>
          </CCol>
        </CFormGroup>
      </div>
    </div>
  );
}

export default HeaderForm;
