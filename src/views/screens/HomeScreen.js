import React, { lazy, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Loader, Message } from "src/containers/utils";
import { CCard, CCardBody, CCardGroup, CCardHeader } from "@coreui/react";
import { CChartPie, CChartDoughnut } from "@coreui/react-chartjs";
import {
  getMainNumbers,
  getRangeEvaluation,
  getAnualRangeEvaluation,
} from "src/redux/actions/dashboardActions";

const WidgetsDropdown = lazy(() => import("../widgets/WidgetsDropdown.js"));

const HomeScreen = ({ history }) => {
  const dispatch = useDispatch();

  // User Selector
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // Numbers Selector
  const {
    users,
    salePlans,
    salePlaces,
    families,
    loading,
    error: errorNumbers,
  } = useSelector((state) => state.numbers);

  // Evaluation Range Selector
  const {
    loading: loadingEvaluations,
    error: errorEvaluations,
    evaluationRange,
  } = useSelector((state) => state.evaluationRange);

  // Evaluation Anual Range Selector
  const {
    loading: loadingAnualEvaluations,
    error: errorAnualEvaluations,
    evaluationRange: evaluationAnualRange,
  } = useSelector((state) => state.evaluationAnualRange);

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      dispatch(getMainNumbers());
      dispatch(getRangeEvaluation());
      dispatch(getAnualRangeEvaluation());
    }
  }, [userInfo, history, dispatch]);

  return (
    <React.Fragment>
      {loading ? (
        <Loader />
      ) : errorNumbers ? (
        <Message variant="danger">{errorNumbers}</Message>
      ) : (
        <WidgetsDropdown
          users={String(users)}
          salePlans={String(salePlans)}
          salePlaces={String(salePlaces)}
          families={String(families)}
        />
      )}

      <CCardGroup columns className="cols-2">
        {loadingAnualEvaluations ? (
          <Loader />
        ) : errorAnualEvaluations ? (
          <Message variant="danger">{errorAnualEvaluations}</Message>
        ) : (
          evaluationAnualRange && (
            <CCard className="shadow">
              <CCardHeader className="text-center">
                Rango de Evaluaciones Anuales
              </CCardHeader>
              <CCardBody>
                <CChartDoughnut
                  datasets={[
                    {
                      backgroundColor: ["#41B883", "#00D8FF", "#DD1B16"],
                      data: evaluationAnualRange,
                    },
                  ]}
                  labels={["Superior", "Adecuado", "Deficiente"]}
                  options={{
                    tooltips: {
                      enabled: true,
                    },
                  }}
                />
              </CCardBody>
            </CCard>
          )
        )}

        <CCard className="shadow">
          {loadingEvaluations ? (
            <Loader />
          ) : errorEvaluations ? (
            <Message variant="danger">{errorEvaluations}</Message>
          ) : (
            evaluationRange && (
              <div>
                <CCardHeader className="text-center">
                  Rango de Evaluaciones Mensuales de Melya
                </CCardHeader>
                <CCardBody>
                  <CChartPie
                    datasets={[
                      {
                        backgroundColor: [
                          "#41B883",
                          "#00D8FF",
                          "#adff2f",
                          "#DD1B16",
                        ],
                        data: evaluationRange,
                      },
                    ]}
                    labels={["Muy Bien", "Bien", "Regular", "Mal"]}
                    options={{
                      tooltips: {
                        enabled: true,
                      },
                    }}
                  />
                </CCardBody>
              </div>
            )
          )}
        </CCard>
      </CCardGroup>
    </React.Fragment>
  );
};

export default HomeScreen;
