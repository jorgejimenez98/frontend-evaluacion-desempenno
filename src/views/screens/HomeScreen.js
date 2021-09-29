import React, { lazy, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardGroup,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CWidgetProgressIcon,
} from "@coreui/react";
import { CChartBar, CChartPie } from "@coreui/react-chartjs";
import { DocsLink } from "src/reusable";
import CIcon from "@coreui/icons-react";
import MainChartExample from "../charts/MainChartExample.js";

const WidgetsDropdown = lazy(() => import("../widgets/WidgetsDropdown.js"));

const HomeScreen = ({ history }) => {
  // User Selector
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [userInfo, history]);

  return (
    <React.Fragment>
      <WidgetsDropdown />

      {
        <CCard>
          <CCardBody style={{ fontSize: "" }}>
            <CRow>
              <CCol sm="5">
                <h4 id="traffic" className="card-title mb-0">
                  Traffic
                </h4>
                <div className="small text-muted">November 2017</div>
              </CCol>
              <CCol sm="7" className="d-none d-md-block">
                <CButton color="primary" className="float-right">
                  <CIcon name="cil-cloud-download" />
                </CButton>
                <CButtonGroup className="float-right mr-3">
                  {["Day", "Month", "Year"].map((value) => (
                    <CButton
                      color="outline-secondary"
                      key={value}
                      className="mx-0"
                      active={value === "Month"}
                    >
                      {value}
                    </CButton>
                  ))}
                </CButtonGroup>
              </CCol>
            </CRow>
            <MainChartExample style={{ height: "300px", marginTop: "40px" }} />
          </CCardBody>
          <CCardFooter>
            <CRow className="text-center">
              <CCol md sm="12" className="mb-sm-2 mb-0">
                <div className="text-muted">Visits</div>
                <strong>29.703 Users (40%)</strong>
                <CProgress
                  className="progress-xs mt-2"
                  precision={1}
                  color="success"
                  value={40}
                />
              </CCol>
              <CCol md sm="12" className="mb-sm-2 mb-0 d-md-down-none">
                <div className="text-muted">Unique</div>
                <strong>24.093 Users (20%)</strong>
                <CProgress
                  className="progress-xs mt-2"
                  precision={1}
                  color="info"
                  value={40}
                />
              </CCol>
              <CCol md sm="12" className="mb-sm-2 mb-0">
                <div className="text-muted">Pageviews</div>
                <strong>78.706 Views (60%)</strong>
                <CProgress
                  className="progress-xs mt-2"
                  precision={1}
                  color="warning"
                  value={40}
                />
              </CCol>
              <CCol md sm="12" className="mb-sm-2 mb-0">
                <div className="text-muted">New Users</div>
                <strong>22.123 Users (80%)</strong>
                <CProgress
                  className="progress-xs mt-2"
                  precision={1}
                  color="danger"
                  value={40}
                />
              </CCol>
              <CCol md sm="12" className="mb-sm-2 mb-0 d-md-down-none">
                <div className="text-muted">Bounce Rate</div>
                <strong>Average Rate (40.15%)</strong>
                <CProgress
                  className="progress-xs mt-2"
                  precision={1}
                  value={40}
                />
              </CCol>
            </CRow>
          </CCardFooter>
        </CCard>
      }

      <CCardGroup columns className="cols-2">
        <CCard>
          <CCardHeader>
            Bar Chart
            <DocsLink href="http://www.chartjs.org" />
          </CCardHeader>
          <CCardBody>
            <CChartBar
              datasets={[
                {
                  label: "GitHub Commits",
                  backgroundColor: "#f87979",
                  data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11],
                },
              ]}
              labels="months"
              options={{
                tooltips: {
                  enabled: true,
                },
              }}
            />
          </CCardBody>
        </CCard>

        <CCard>
          <CCardHeader>Pie Chart</CCardHeader>
          <CCardBody>
            <CChartPie
              datasets={[
                {
                  backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#DD1B16"],
                  data: [40, 20, 80, 10],
                },
              ]}
              labels={["VueJs", "EmberJs", "ReactJs", "AngularJs"]}
              options={{
                tooltips: {
                  enabled: true,
                },
              }}
            />
          </CCardBody>
        </CCard>
      </CCardGroup>
    </React.Fragment>
  );
};

export default HomeScreen;
