import React from "react";
import { CCol, CFormGroup, CLabel, CBadge } from "@coreui/react";

function EvaluatorContent({ payTime, worker, evaluator, dateCreation }) {
  return (
    <div>
      {/* Periodo de PAGO */}
      <CFormGroup row>
        <CCol md="3">
          <CLabel>Período de Pago</CLabel>
        </CCol>
        <CCol xs="12" md="9">
          <h5>
            {payTime?.year} - {payTime?.month}
          </h5>
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
          <p>{worker?.nombreCompleto}</p>
        </CCol>
      </CFormGroup>

      {/* Cargo  del  TRABAJADOR*/}
      <CFormGroup row className="mt-n2">
        <CCol md="3">
          <CLabel>Cargo que ocupa el trabajador a evaluar</CLabel>
        </CCol>
        <CCol xs="12" md="9">
          <h5>
            <CBadge color="success">{worker?.cargo}</CBadge>
          </h5>
        </CCol>
      </CFormGroup>

      <hr className="mt-n2" />
      {/* TRABAJADOR EVALUADOR */}
      <CFormGroup row>
        <CCol md="3">
          <CLabel>Nombre del Evaluador</CLabel>
        </CCol>
        <CCol xs="12" md="9">
          <p>{evaluator?.nombreCompleto}</p>
        </CCol>
      </CFormGroup>

      {/* Cargo  del  TRABAJADOR evaluador*/}
      <CFormGroup row className="mt-n2">
        <CCol md="3">
          <CLabel>Cargo que ocupa el Evaluador</CLabel>
        </CCol>
        <CCol xs="12" md="9">
          <h5>
            <CBadge color="info">{evaluator?.cargo}</CBadge>
          </h5>
        </CCol>
      </CFormGroup>
    </div>
  );
}

export default EvaluatorContent;
