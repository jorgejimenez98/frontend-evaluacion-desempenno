import React, { useState, useEffect } from "react";
import { steps } from "../../monthlyEvaluationScreens/options/steps";
import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  Print,
  Visibility,
} from "@material-ui/icons";
import { Message } from "src/containers/utils/index";
import { meliaSteps } from "./meliaSteps";
import {
  CBadge,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CRow,
  CCol,
} from "@coreui/react";
import {
  Button,
  ButtonGroup,
  FormControl,
  FormControlLabel,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  MobileStepper,
  Radio,
  RadioGroup,
  Tooltip,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ShowDetailsModal from "./ShowDetailsModal";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

function FormContent({
  monthlyGastronomyEvaluation,
  handleSubmitEval,
  monthlyMeliaEvaluation,
  onlyShow,
  handlePrint,
  consultPrintContent,
}) {
  const classes = useStyles();

  // Modal States
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [index, setIndex] = useState(-1);
  const [detailValue, setDetailValue] = useState("");
  // Form States
  const [activeStep, setActiveStep] = useState(0);
  const [actualEvaluation, setActualEvaluation] = useState("");
  const [evaluatedSteps, setEvaluatedSteps] = useState([]);
  const [actualVariant, setActualVariant] = useState("info");
  const [showSelectError, setShowSelectError] = useState(false);

  const [observations, setObservations] = useState("");
  const [asistPunt, setAsistPunt] = useState("");
  const [domCumplTar, setDomCumplTar] = useState("");
  const [trabEqui, setTrabEqui] = useState("");
  const [calAtenClien, setCalAtenClien] = useState("");
  const [cuidadTar, setCuidadTar] = useState("");
  const [cumplNorm, setCumplNorm] = useState("");
  const [capaccamb, setCapaccamb] = useState("");

  const getEval = (value) => {
    return value === 2 ? "M" : value === 3 ? "R" : value === 4 ? "B" : "MB";
  };

  useEffect(() => {
    const existEvaluation1 = (evaluation) => {
      let exist = false;
      evaluatedSteps.forEach((item) => {
        if (evaluation === item.points) {
          exist = true;
        }
      });
      return exist;
    };

    if (monthlyMeliaEvaluation !== null) {
      const mme = monthlyMeliaEvaluation;
      setObservations(mme.observations);
      setAsistPunt(`1|${mme.asist_punt}|${getEval(mme.asist_punt)}`);
      setDomCumplTar(`2|${mme.dom_cum_tars}|${getEval(mme.dom_cum_tars)}`);
      setTrabEqui(`3|${mme.trab_equipo}|${getEval(mme.trab_equipo)}`);
      setCalAtenClien(
        `4|${mme.cal_aten_cliente}|${getEval(mme.cal_aten_cliente)}`
      );
      setCuidadTar(
        `5|${mme.cui_area_rec_medios}|${getEval(mme.cui_area_rec_medios)}`
      );
      setCumplNorm(`6|${mme.cump_normas}|${getEval(mme.cump_normas)}`);
      setCapaccamb(
        `7|${mme.cap_camb_ini_int}|${getEval(mme.cap_camb_ini_int)}`
      );

      const arrayValues = [
        `1|${mme.asist_punt}|${getEval(mme.asist_punt)}`,
        `2|${mme.dom_cum_tars}|${getEval(mme.dom_cum_tars)}`,
        `3|${mme.trab_equipo}|${getEval(mme.trab_equipo)}`,
        `4|${mme.cal_aten_cliente}|${getEval(mme.cal_aten_cliente)}`,
        `5|${mme.cui_area_rec_medios}|${getEval(mme.cui_area_rec_medios)}`,
        `6|${mme.cump_normas}|${getEval(mme.cump_normas)}`,
        `7|${mme.cap_camb_ini_int}|${getEval(mme.cap_camb_ini_int)}`,
      ];

      arrayValues.forEach((value) => {
        const split = value.split("|");
        let newEvaluatedSteps = evaluatedSteps;
        let exist1 = false;
        newEvaluatedSteps.forEach((item, i) => {
          if (i === Number(split[0]) - 1) {
            exist1 = true;
            item.points = Number(split[1]);
            item.index = Number(split[0]);
            item.eval = split[2];
          }
        });
        if (!exist1) {
          newEvaluatedSteps.push({
            points: Number(split[1]),
            index: Number(split[0]),
            eval: split[2],
          });
        }
        setEvaluatedSteps(newEvaluatedSteps);

        // Update Actual Eval
        let count = 0;
        evaluatedSteps.forEach((item) => (count += item.points));
        let finalEval = "";
        let variant = "";
        if (count < 14 || (count >= 14 && count <= 20)) {
          finalEval = "M";
          variant = "danger";
        } else if (count > 20 && count <= 27) {
          finalEval = "R";
          variant = "warning";
        } else if (count > 27 && count <= 31) {
          finalEval = "B";
          variant = "info";
          if (existEvaluation1(2)) {
            finalEval = "R";
            variant = "warning";
          }
        } else if (count > 31) {
          finalEval = "MB";
          variant = "success";
          if (existEvaluation1(2) || existEvaluation1(3)) {
            finalEval = "B";
            variant = "info";
          }
        }
        setActualVariant(variant);
        setActualEvaluation(`${count} - ${finalEval}`);
      });
    }
  }, [monthlyMeliaEvaluation, evaluatedSteps]);

  const closeModal = () => {
    setShowDetailsModal(false);
    setIndex(-1);
    setDetailValue("");
  };

  const handleClickDetails = (index, value) => () => {
    setShowDetailsModal(true);
    setDetailValue(`${index}|${value}|${getEval(value)}`);
    setIndex(index);
  };

  const handleSubmit = () => {
    handleSubmitEval(evaluatedSteps, observations);
  };

  const handleNext = () => {
    let exist1 = false;
    evaluatedSteps.forEach((item, index) => {
      if (index === activeStep) exist1 = true;
    });
    if (!exist1) {
      setShowSelectError(true);
    } else {
      setShowSelectError(false);
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const getBadgeVariant = (value) => {
    return value === 2
      ? "danger"
      : value === 3
      ? "warning"
      : value === 4
      ? "info"
      : "success";
  };

  const updateEvaluatedSteps = (value) => {
    const split = value.split("|");
    let newEvaluatedSteps = evaluatedSteps;
    let exist1 = false;
    newEvaluatedSteps.forEach((item, i) => {
      if (i === Number(split[0]) - 1) {
        exist1 = true;
        item.points = Number(split[1]);
        item.index = Number(split[0]);
        item.eval = split[2];
      }
    });
    if (!exist1) {
      newEvaluatedSteps.push({
        points: Number(split[1]),
        index: Number(split[0]),
        eval: split[2],
      });
    }
    setEvaluatedSteps(newEvaluatedSteps);
    updateActualEvaluation();
  };

  const existEvaluation = (evaluation) => {
    let exist = false;
    evaluatedSteps.forEach((item) => {
      if (evaluation === item.points) {
        exist = true;
      }
    });
    return exist;
  };

  const updateActualEvaluation = () => {
    let count = 0;
    evaluatedSteps.forEach((item) => (count += item.points));
    let finalEval = "";
    let variant = "";
    if (count < 14 || (count >= 14 && count <= 20)) {
      finalEval = "M";
      variant = "danger";
    } else if (count > 20 && count <= 27) {
      finalEval = "R";
      variant = "warning";
    } else if (count > 27 && count <= 31) {
      finalEval = "B";
      variant = "info";
      if (existEvaluation(2)) {
        finalEval = "R";
        variant = "warning";
      }
    } else if (count > 31) {
      finalEval = "MB";
      variant = "success";
      if (existEvaluation(2) || existEvaluation(3)) {
        finalEval = "B";
        variant = "info";
      }
    }
    setActualVariant(variant);
    setActualEvaluation(`${count} - ${finalEval}`);
  };

  const handleClick = (index) => () => {
    setShowSelectError(false);
    window.scrollTo({
      top: 500,
      behavior: "smooth",
    });
    setActiveStep(index);
  };

  return (
    <div>
      <CCard>
        <CCardHeader>
          <CRow>
            <CCol md={4} xs={12} className="float-left">
              <h5 className="text-muted">Indicadores a Evaluar</h5>
            </CCol>
            <CCol md={8} xs={12}>
              <h5 className="text-right text-muted mb-3">
                Evaluación hasta el momento:{" "}
                {actualEvaluation === "" ? (
                  "Nada todavia"
                ) : (
                  <CBadge color={actualVariant}>{actualEvaluation}</CBadge>
                )}
              </h5>
            </CCol>
          </CRow>
        </CCardHeader>
        {monthlyGastronomyEvaluation && (
          <CCardBody>
            <ShowDetailsModal
              showModal={showDetailsModal}
              closeModal={closeModal}
              index={index}
              detailValue={detailValue}
            />

            <div className={classes.root}>
              {showSelectError && (
                <Message variant="danger">Debes seleccionar una opción</Message>
              )}

              {/* Step 1 */}
              {activeStep === 0 && (
                <div>
                  <h5 className="text-center text-muted">
                    Asistencia y puntualidad
                  </h5>
                  <div className="text-center">
                    <FormControl
                      component="fieldset"
                      className="text-center"
                      disabled={onlyShow}
                    >
                      <RadioGroup
                        row
                        value={asistPunt}
                        onChange={(e) => {
                          setAsistPunt(e.target.value);
                          updateEvaluatedSteps(e.target.value);
                        }}
                      >
                        <FormControlLabel
                          value={"1|2|M"}
                          control={<Radio />}
                          label={
                            <CBadge color="danger" className="mt-2">
                              2 - M
                            </CBadge>
                          }
                        />
                        <FormControlLabel
                          value={"1|3|R"}
                          control={<Radio />}
                          label={
                            <CBadge color="warning" className="mt-2">
                              3 - R
                            </CBadge>
                          }
                        />
                        <FormControlLabel
                          value={"1|4|B"}
                          control={<Radio />}
                          label={
                            <CBadge color="info" className="mt-2">
                              4 - B
                            </CBadge>
                          }
                        />
                        <FormControlLabel
                          value={"1|5|MB"}
                          control={<Radio />}
                          label={
                            <CBadge color="success" className="mt-2">
                              5 - MB
                            </CBadge>
                          }
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                  <List component="nav" aria-label="secondary mailbox folder">
                    {/* 1 */}
                    <Tooltip title="Click para ver detalles de este indicador">
                      <ListItem
                        button
                        onClick={handleClickDetails(
                          1,
                          monthlyGastronomyEvaluation.ind1_CDRI
                        )}
                      >
                        <ListItemAvatar>
                          <CBadge color={"info"}>1</CBadge>
                        </ListItemAvatar>
                        <ListItemText primary={steps[0].text} />
                        <ListItemSecondaryAction>
                          <CBadge
                            color={getBadgeVariant(
                              monthlyGastronomyEvaluation.ind1_CDRI
                            )}
                          >
                            <strong>
                              {monthlyGastronomyEvaluation.ind1_CDRI}
                            </strong>{" "}
                            - {getEval(monthlyGastronomyEvaluation.ind1_CDRI)}
                          </CBadge>
                        </ListItemSecondaryAction>
                      </ListItem>
                    </Tooltip>

                    {/* 2 */}
                    <Tooltip title="Click para ver detalles de este indicador">
                      <ListItem
                        button
                        onClick={handleClickDetails(
                          2,
                          monthlyGastronomyEvaluation.ind2_AMD
                        )}
                      >
                        <ListItemAvatar>
                          <CBadge color={"info"}>2</CBadge>
                        </ListItemAvatar>
                        <ListItemText primary={steps[1].text} />
                        <ListItemSecondaryAction>
                          <CBadge
                            color={getBadgeVariant(
                              monthlyGastronomyEvaluation.ind2_AMD
                            )}
                          >
                            <strong>
                              {monthlyGastronomyEvaluation.ind2_AMD}
                            </strong>{" "}
                            - {getEval(monthlyGastronomyEvaluation.ind2_AMD)}
                          </CBadge>
                        </ListItemSecondaryAction>
                      </ListItem>
                    </Tooltip>
                    {/* 24 */}
                    <Tooltip title="Click para ver detalles de este indicador">
                      <ListItem
                        button
                        onClick={handleClickDetails(
                          24,
                          monthlyGastronomyEvaluation.ind24_APAT
                        )}
                      >
                        <ListItemAvatar>
                          <CBadge color={"info"}>24</CBadge>
                        </ListItemAvatar>
                        <ListItemText primary={steps[23].text} />
                        <ListItemSecondaryAction>
                          <CBadge
                            color={getBadgeVariant(
                              monthlyGastronomyEvaluation.ind24_APAT
                            )}
                          >
                            <strong>
                              {monthlyGastronomyEvaluation.ind24_APAT}
                            </strong>{" "}
                            - {getEval(monthlyGastronomyEvaluation.ind24_APAT)}
                          </CBadge>
                        </ListItemSecondaryAction>
                      </ListItem>
                    </Tooltip>
                  </List>
                </div>
              )}

              {/* Step 2 */}
              {activeStep === 1 && (
                <div>
                  <h5 className="text-center text-muted">
                    Dominio y cumplimiento de las tareas
                  </h5>

                  <div className="text-center">
                    <FormControl
                      component="fieldset"
                      className="text-center"
                      disabled={onlyShow}
                    >
                      <RadioGroup
                        row
                        value={domCumplTar}
                        onChange={(e) => {
                          setDomCumplTar(e.target.value);
                          updateEvaluatedSteps(e.target.value);
                        }}
                      >
                        <FormControlLabel
                          value={"2|2|M"}
                          control={<Radio />}
                          label={
                            <CBadge color="danger" className="mt-2">
                              2 - M
                            </CBadge>
                          }
                        />
                        <FormControlLabel
                          value={"2|3|R"}
                          control={<Radio />}
                          label={
                            <CBadge color="warning" className="mt-2">
                              3 - R
                            </CBadge>
                          }
                        />
                        <FormControlLabel
                          value={"2|4|B"}
                          control={<Radio />}
                          label={
                            <CBadge color="info" className="mt-2">
                              4 - B
                            </CBadge>
                          }
                        />
                        <FormControlLabel
                          value={"2|5|MB"}
                          control={<Radio />}
                          label={
                            <CBadge color="success" className="mt-2">
                              5 - MB
                            </CBadge>
                          }
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>

                  <List component="nav" aria-label="secondary mailbox folder">
                    {/* 10 */}
                    <Tooltip title="Click para ver detalles de este indicador">
                      <ListItem
                        button
                        onClick={handleClickDetails(
                          10,
                          monthlyGastronomyEvaluation.ind10_CPI
                        )}
                      >
                        <ListItemAvatar>
                          <CBadge color={"info"}>10</CBadge>
                        </ListItemAvatar>
                        <ListItemText primary={steps[9].text} />
                        <ListItemSecondaryAction>
                          <CBadge
                            color={getBadgeVariant(
                              monthlyGastronomyEvaluation.ind10_CPI
                            )}
                          >
                            <strong>
                              {monthlyGastronomyEvaluation.ind10_CPI}
                            </strong>{" "}
                            - {getEval(monthlyGastronomyEvaluation.ind10_CPI)}
                          </CBadge>
                        </ListItemSecondaryAction>
                      </ListItem>
                    </Tooltip>
                    {/* 13 */}
                    <Tooltip title="Click para ver detalles de este indicador">
                      <ListItem
                        button
                        onClick={handleClickDetails(
                          13,
                          monthlyGastronomyEvaluation.ind13_GV
                        )}
                      >
                        <ListItemAvatar>
                          <CBadge color={"info"}>13</CBadge>
                        </ListItemAvatar>
                        <ListItemText primary={steps[12].text} />
                        <ListItemSecondaryAction>
                          <CBadge
                            color={getBadgeVariant(
                              monthlyGastronomyEvaluation.ind13_GV
                            )}
                          >
                            <strong>
                              {monthlyGastronomyEvaluation.ind13_GV}
                            </strong>{" "}
                            - {getEval(monthlyGastronomyEvaluation.ind13_GV)}
                          </CBadge>
                        </ListItemSecondaryAction>
                      </ListItem>
                    </Tooltip>
                    {/* 14 */}
                    <Tooltip title="Click para ver detalles de este indicador">
                      <ListItem
                        button
                        onClick={handleClickDetails(
                          14,
                          monthlyGastronomyEvaluation.ind14_DF
                        )}
                      >
                        <ListItemAvatar>
                          <CBadge color={"info"}>14</CBadge>
                        </ListItemAvatar>
                        <ListItemText primary={steps[13].text} />
                        <ListItemSecondaryAction>
                          <CBadge
                            color={getBadgeVariant(
                              monthlyGastronomyEvaluation.ind14_DF
                            )}
                          >
                            <strong>
                              {monthlyGastronomyEvaluation.ind14_DF}
                            </strong>{" "}
                            - {getEval(monthlyGastronomyEvaluation.ind14_DF)}
                          </CBadge>
                        </ListItemSecondaryAction>
                      </ListItem>
                    </Tooltip>
                    {/* 15 */}
                    <Tooltip title="Click para ver detalles de este indicador">
                      <ListItem
                        button
                        onClick={handleClickDetails(
                          15,
                          monthlyGastronomyEvaluation.ind15_CTP
                        )}
                      >
                        <ListItemAvatar>
                          <CBadge color={"info"}>15</CBadge>
                        </ListItemAvatar>
                        <ListItemText primary={steps[14].text} />
                        <ListItemSecondaryAction>
                          <CBadge
                            color={getBadgeVariant(
                              monthlyGastronomyEvaluation.ind15_CTP
                            )}
                          >
                            <strong>
                              {monthlyGastronomyEvaluation.ind15_CTP}
                            </strong>{" "}
                            - {getEval(monthlyGastronomyEvaluation.ind15_CTP)}
                          </CBadge>
                        </ListItemSecondaryAction>
                      </ListItem>
                    </Tooltip>
                    {/* 19 */}
                    <Tooltip title="Click para ver detalles de este indicador">
                      <ListItem
                        button
                        onClick={handleClickDetails(
                          19,
                          monthlyGastronomyEvaluation.ind19_CTA
                        )}
                      >
                        <ListItemAvatar>
                          <CBadge color={"info"}>19</CBadge>
                        </ListItemAvatar>
                        <ListItemText primary={steps[18].text} />
                        <ListItemSecondaryAction>
                          <CBadge
                            color={getBadgeVariant(
                              monthlyGastronomyEvaluation.ind19_CTA
                            )}
                          >
                            <strong>
                              {monthlyGastronomyEvaluation.ind19_CTA}
                            </strong>{" "}
                            - {getEval(monthlyGastronomyEvaluation.ind19_CTA)}
                          </CBadge>
                        </ListItemSecondaryAction>
                      </ListItem>
                    </Tooltip>
                  </List>
                </div>
              )}

              {/* Step 3 */}
              {activeStep === 2 && (
                <div>
                  <h5 className="text-center text-muted">Trabajo en equipo</h5>

                  <div className="text-center">
                    <FormControl
                      component="fieldset"
                      className="text-center"
                      disabled={onlyShow}
                    >
                      <RadioGroup
                        row
                        value={trabEqui}
                        onChange={(e) => {
                          setTrabEqui(e.target.value);
                          updateEvaluatedSteps(e.target.value);
                        }}
                      >
                        <FormControlLabel
                          value={"3|2|M"}
                          control={<Radio />}
                          label={
                            <CBadge color="danger" className="mt-2">
                              2 - M
                            </CBadge>
                          }
                        />
                        <FormControlLabel
                          value={"3|3|R"}
                          control={<Radio />}
                          label={
                            <CBadge color="warning" className="mt-2">
                              3 - R
                            </CBadge>
                          }
                        />
                        <FormControlLabel
                          value={"3|4|B"}
                          control={<Radio />}
                          label={
                            <CBadge color="info" className="mt-2">
                              4 - B
                            </CBadge>
                          }
                        />
                        <FormControlLabel
                          value={"3|5|MB"}
                          control={<Radio />}
                          label={
                            <CBadge color="success" className="mt-2">
                              5 - MB
                            </CBadge>
                          }
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>

                  <List component="nav" aria-label="secondary mailbox folder">
                    {/* 3 */}
                    <Tooltip title="Click para ver detalles de este indicador">
                      <ListItem
                        button
                        onClick={handleClickDetails(
                          3,
                          monthlyGastronomyEvaluation.ind3_PAPPI
                        )}
                      >
                        <ListItemAvatar>
                          <CBadge color={"info"}>3</CBadge>
                        </ListItemAvatar>
                        <ListItemText primary={steps[2].text} />
                        <ListItemSecondaryAction>
                          <CBadge
                            color={getBadgeVariant(
                              monthlyGastronomyEvaluation.ind3_PAPPI
                            )}
                          >
                            <strong>
                              {monthlyGastronomyEvaluation.ind3_PAPPI}
                            </strong>{" "}
                            - {getEval(monthlyGastronomyEvaluation.ind3_PAPPI)}
                          </CBadge>
                        </ListItemSecondaryAction>
                      </ListItem>
                    </Tooltip>
                    {/* 17 */}
                    <Tooltip title="Click para ver detalles de este indicador">
                      <ListItem
                        button
                        onClick={handleClickDetails(
                          17,
                          monthlyGastronomyEvaluation.ind17_DIS
                        )}
                      >
                        <ListItemAvatar>
                          <CBadge color={"info"}>17</CBadge>
                        </ListItemAvatar>
                        <ListItemText primary={steps[16].text} />
                        <ListItemSecondaryAction>
                          <CBadge
                            color={getBadgeVariant(
                              monthlyGastronomyEvaluation.ind17_DIS
                            )}
                          >
                            <strong>
                              {monthlyGastronomyEvaluation.ind17_DIS}
                            </strong>{" "}
                            - {getEval(monthlyGastronomyEvaluation.ind17_DIS)}
                          </CBadge>
                        </ListItemSecondaryAction>
                      </ListItem>
                    </Tooltip>
                    {/* 18 */}
                    <Tooltip title="Click para ver detalles de este indicador">
                      <ListItem
                        button
                        onClick={handleClickDetails(
                          18,
                          monthlyGastronomyEvaluation.ind18_CDPA
                        )}
                      >
                        <ListItemAvatar>
                          <CBadge color={"info"}>18</CBadge>
                        </ListItemAvatar>
                        <ListItemText primary={steps[17].text} />
                        <ListItemSecondaryAction>
                          <CBadge
                            color={getBadgeVariant(
                              monthlyGastronomyEvaluation.ind18_CDPA
                            )}
                          >
                            <strong>
                              {monthlyGastronomyEvaluation.ind18_CDPA}
                            </strong>{" "}
                            - {getEval(monthlyGastronomyEvaluation.ind18_CDPA)}
                          </CBadge>
                        </ListItemSecondaryAction>
                      </ListItem>
                    </Tooltip>
                  </List>
                </div>
              )}

              {/* Step 4 */}
              {activeStep === 3 && (
                <div>
                  <h5 className="text-center text-muted">
                    Calidad y atención al cliente
                  </h5>

                  <div className="text-center">
                    <FormControl
                      component="fieldset"
                      className="text-center"
                      disabled={onlyShow}
                    >
                      <RadioGroup
                        row
                        value={calAtenClien}
                        onChange={(e) => {
                          setCalAtenClien(e.target.value);
                          updateEvaluatedSteps(e.target.value);
                        }}
                      >
                        <FormControlLabel
                          value={"4|2|M"}
                          control={<Radio />}
                          label={
                            <CBadge color="danger" className="mt-2">
                              2 - M
                            </CBadge>
                          }
                        />
                        <FormControlLabel
                          value={"4|3|R"}
                          control={<Radio />}
                          label={
                            <CBadge color="warning" className="mt-2">
                              3 - R
                            </CBadge>
                          }
                        />
                        <FormControlLabel
                          value={"4|4|B"}
                          control={<Radio />}
                          label={
                            <CBadge color="info" className="mt-2">
                              4 - B
                            </CBadge>
                          }
                        />
                        <FormControlLabel
                          value={"4|5|MB"}
                          control={<Radio />}
                          label={
                            <CBadge color="success" className="mt-2">
                              5 - MB
                            </CBadge>
                          }
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>

                  <List component="nav" aria-label="secondary mailbox folder">
                    {/* 8 */}
                    <Tooltip title="Click para ver detalles de este indicador">
                      <ListItem
                        button
                        onClick={handleClickDetails(
                          8,
                          monthlyGastronomyEvaluation.ind8_CCPC
                        )}
                      >
                        <ListItemAvatar>
                          <CBadge color={"info"}>8</CBadge>
                        </ListItemAvatar>
                        <ListItemText primary={steps[7].text} />
                        <ListItemSecondaryAction>
                          <CBadge
                            color={getBadgeVariant(
                              monthlyGastronomyEvaluation.ind8_CCPC
                            )}
                          >
                            <strong>
                              {monthlyGastronomyEvaluation.ind8_CCPC}
                            </strong>{" "}
                            - {getEval(monthlyGastronomyEvaluation.ind8_CCPC)}
                          </CBadge>
                        </ListItemSecondaryAction>
                      </ListItem>
                    </Tooltip>
                    {/* 9 */}
                    <Tooltip title="Click para ver detalles de este indicador">
                      <ListItem
                        button
                        onClick={handleClickDetails(
                          9,
                          monthlyGastronomyEvaluation.ind9_NSC
                        )}
                      >
                        <ListItemAvatar>
                          <CBadge color={"info"}>9</CBadge>
                        </ListItemAvatar>
                        <ListItemText primary={steps[8].text} />
                        <ListItemSecondaryAction>
                          <CBadge
                            color={getBadgeVariant(
                              monthlyGastronomyEvaluation.ind9_NSC
                            )}
                          >
                            <strong>
                              {monthlyGastronomyEvaluation.ind9_NSC}
                            </strong>{" "}
                            - {getEval(monthlyGastronomyEvaluation.ind9_NSC)}
                          </CBadge>
                        </ListItemSecondaryAction>
                      </ListItem>
                    </Tooltip>
                    {/* 16 */}
                    <Tooltip title="Click para ver detalles de este indicador">
                      <ListItem
                        button
                        onClick={handleClickDetails(
                          16,
                          monthlyGastronomyEvaluation.ind16_AC
                        )}
                      >
                        <ListItemAvatar>
                          <CBadge color={"info"}>16</CBadge>
                        </ListItemAvatar>
                        <ListItemText primary={steps[15].text} />
                        <ListItemSecondaryAction>
                          <CBadge
                            color={getBadgeVariant(
                              monthlyGastronomyEvaluation.ind16_AC
                            )}
                          >
                            <strong>
                              {monthlyGastronomyEvaluation.ind16_AC}
                            </strong>{" "}
                            - {getEval(monthlyGastronomyEvaluation.ind16_AC)}
                          </CBadge>
                        </ListItemSecondaryAction>
                      </ListItem>
                    </Tooltip>
                    {/* 20 */}
                    <Tooltip title="Click para ver detalles de este indicador">
                      <ListItem
                        button
                        onClick={handleClickDetails(
                          20,
                          monthlyGastronomyEvaluation.ind20_HOPT
                        )}
                      >
                        <ListItemAvatar>
                          <CBadge color={"info"}>20</CBadge>
                        </ListItemAvatar>
                        <ListItemText primary={steps[19].text} />
                        <ListItemSecondaryAction>
                          <CBadge
                            color={getBadgeVariant(
                              monthlyGastronomyEvaluation.ind20_HOPT
                            )}
                          >
                            <strong>
                              {monthlyGastronomyEvaluation.ind20_HOPT}
                            </strong>{" "}
                            - {getEval(monthlyGastronomyEvaluation.ind20_HOPT)}
                          </CBadge>
                        </ListItemSecondaryAction>
                      </ListItem>
                    </Tooltip>
                    {/* 21 */}
                    <Tooltip title="Click para ver detalles de este indicador">
                      <ListItem
                        button
                        onClick={handleClickDetails(
                          21,
                          monthlyGastronomyEvaluation.ind21_CNSS
                        )}
                      >
                        <ListItemAvatar>
                          <CBadge color={"info"}>21</CBadge>
                        </ListItemAvatar>
                        <ListItemText primary={steps[20].text} />
                        <ListItemSecondaryAction>
                          <CBadge
                            color={getBadgeVariant(
                              monthlyGastronomyEvaluation.ind21_CNSS
                            )}
                          >
                            <strong>
                              {monthlyGastronomyEvaluation.ind21_CNSS}
                            </strong>{" "}
                            - {getEval(monthlyGastronomyEvaluation.ind21_CNSS)}
                          </CBadge>
                        </ListItemSecondaryAction>
                      </ListItem>
                    </Tooltip>
                    {/* 22 */}
                    <Tooltip title="Click para ver detalles de este indicador">
                      <ListItem
                        button
                        onClick={handleClickDetails(
                          22,
                          monthlyGastronomyEvaluation.ind22_UIE
                        )}
                      >
                        <ListItemAvatar>
                          <CBadge color={"info"}>22</CBadge>
                        </ListItemAvatar>
                        <ListItemText primary={steps[21].text} />
                        <ListItemSecondaryAction>
                          <CBadge
                            color={getBadgeVariant(
                              monthlyGastronomyEvaluation.ind22_UIE
                            )}
                          >
                            <strong>
                              {monthlyGastronomyEvaluation.ind22_UIE}
                            </strong>{" "}
                            - {getEval(monthlyGastronomyEvaluation.ind22_UIE)}
                          </CBadge>
                        </ListItemSecondaryAction>
                      </ListItem>
                    </Tooltip>
                    {/* 23 */}
                    <Tooltip title="Click para ver detalles de este indicador">
                      <ListItem
                        button
                        onClick={handleClickDetails(
                          23,
                          monthlyGastronomyEvaluation.ind23_LCH
                        )}
                      >
                        <ListItemAvatar>
                          <CBadge color={"info"}>23</CBadge>
                        </ListItemAvatar>
                        <ListItemText primary={steps[22].text} />
                        <ListItemSecondaryAction>
                          <CBadge
                            color={getBadgeVariant(
                              monthlyGastronomyEvaluation.ind23_LCH
                            )}
                          >
                            <strong>
                              {monthlyGastronomyEvaluation.ind23_LCH}
                            </strong>{" "}
                            - {getEval(monthlyGastronomyEvaluation.ind23_LCH)}
                          </CBadge>
                        </ListItemSecondaryAction>
                      </ListItem>
                    </Tooltip>
                  </List>
                </div>
              )}

              {/* Step 5 */}
              {activeStep === 4 && (
                <div>
                  <h5 className="text-center text-muted">
                    Cuidado de las áreas, uso adecuado de recursos y medios de
                    trabajo
                  </h5>

                  <div className="text-center">
                    <FormControl
                      component="fieldset"
                      className="text-center"
                      disabled={onlyShow}
                    >
                      <RadioGroup
                        row
                        value={cuidadTar}
                        onChange={(e) => {
                          setCuidadTar(e.target.value);
                          updateEvaluatedSteps(e.target.value);
                        }}
                      >
                        <FormControlLabel
                          value={"5|2|M"}
                          control={<Radio />}
                          label={
                            <CBadge color="danger" className="mt-2">
                              2 - M
                            </CBadge>
                          }
                        />
                        <FormControlLabel
                          value={"5|3|R"}
                          control={<Radio />}
                          label={
                            <CBadge color="warning" className="mt-2">
                              3 - R
                            </CBadge>
                          }
                        />
                        <FormControlLabel
                          value={"5|4|B"}
                          control={<Radio />}
                          label={
                            <CBadge color="info" className="mt-2">
                              4 - B
                            </CBadge>
                          }
                        />
                        <FormControlLabel
                          value={"5|5|MB"}
                          control={<Radio />}
                          label={
                            <CBadge color="success" className="mt-2">
                              5 - MB
                            </CBadge>
                          }
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>

                  <List component="nav" aria-label="secondary mailbox folder">
                    {/* 5 */}
                    <Tooltip title="Click para ver detalles de este indicador">
                      <ListItem
                        button
                        onClick={handleClickDetails(
                          5,
                          monthlyGastronomyEvaluation.ind5_ROCR
                        )}
                      >
                        <ListItemAvatar>
                          <CBadge color={"info"}>5</CBadge>
                        </ListItemAvatar>
                        <ListItemText primary={steps[4].text} />
                        <ListItemSecondaryAction>
                          <CBadge
                            color={getBadgeVariant(
                              monthlyGastronomyEvaluation.ind5_ROCR
                            )}
                          >
                            <strong>
                              {monthlyGastronomyEvaluation.ind5_ROCR}
                            </strong>{" "}
                            - {getEval(monthlyGastronomyEvaluation.ind5_ROCR)}
                          </CBadge>
                        </ListItemSecondaryAction>
                      </ListItem>
                    </Tooltip>
                    {/* 6 */}
                    <Tooltip title="Click para ver detalles de este indicador">
                      <ListItem
                        button
                        onClick={handleClickDetails(
                          6,
                          monthlyGastronomyEvaluation.ind6_PCRBBRC
                        )}
                      >
                        <ListItemAvatar>
                          <CBadge color={"info"}>6</CBadge>
                        </ListItemAvatar>
                        <ListItemText primary={steps[5].text} />
                        <ListItemSecondaryAction>
                          <CBadge
                            color={getBadgeVariant(
                              monthlyGastronomyEvaluation.ind6_PCRBBRC
                            )}
                          >
                            <strong>
                              {monthlyGastronomyEvaluation.ind6_PCRBBRC}
                            </strong>{" "}
                            -{" "}
                            {getEval(monthlyGastronomyEvaluation.ind6_PCRBBRC)}
                          </CBadge>
                        </ListItemSecondaryAction>
                      </ListItem>
                    </Tooltip>
                  </List>
                </div>
              )}

              {/* Step 6 */}
              {activeStep === 5 && (
                <div>
                  <h5 className="text-center text-muted">
                    Cumplimiento de normas de uniformidad y comportamiento
                  </h5>

                  <div className="text-center">
                    <FormControl
                      component="fieldset"
                      className="text-center"
                      disabled={onlyShow}
                    >
                      <RadioGroup
                        row
                        value={cumplNorm}
                        onChange={(e) => {
                          setCumplNorm(e.target.value);
                          updateEvaluatedSteps(e.target.value);
                        }}
                      >
                        <FormControlLabel
                          value={"6|2|M"}
                          control={<Radio />}
                          label={
                            <CBadge color="danger" className="mt-2">
                              2 - M
                            </CBadge>
                          }
                        />
                        <FormControlLabel
                          value={"6|3|R"}
                          control={<Radio />}
                          label={
                            <CBadge color="warning" className="mt-2">
                              3 - R
                            </CBadge>
                          }
                        />
                        <FormControlLabel
                          value={"6|4|B"}
                          control={<Radio />}
                          label={
                            <CBadge color="info" className="mt-2">
                              4 - B
                            </CBadge>
                          }
                        />
                        <FormControlLabel
                          value={"6|5|MB"}
                          control={<Radio />}
                          label={
                            <CBadge color="success" className="mt-2">
                              5 - MB
                            </CBadge>
                          }
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>

                  <List component="nav" aria-label="secondary mailbox folder">
                    {/* 4 */}
                    <Tooltip title="Click para ver detalles de este indicador">
                      <ListItem
                        button
                        onClick={handleClickDetails(
                          4,
                          monthlyGastronomyEvaluation.ind4_CEDP
                        )}
                      >
                        <ListItemAvatar>
                          <CBadge color={"info"}>4</CBadge>
                        </ListItemAvatar>
                        <ListItemText primary={steps[3].text} />
                        <ListItemSecondaryAction>
                          <CBadge
                            color={getBadgeVariant(
                              monthlyGastronomyEvaluation.ind4_CEDP
                            )}
                          >
                            <strong>
                              {monthlyGastronomyEvaluation.ind4_CEDP}
                            </strong>{" "}
                            - {getEval(monthlyGastronomyEvaluation.ind4_CEDP)}
                          </CBadge>
                        </ListItemSecondaryAction>
                      </ListItem>
                    </Tooltip>
                    {/* 7 */}
                    <Tooltip title="Click para ver detalles de este indicador">
                      <ListItem
                        button
                        onClick={handleClickDetails(
                          7,
                          monthlyGastronomyEvaluation.ind7_CNPE
                        )}
                      >
                        <ListItemAvatar>
                          <CBadge color={"info"}>7</CBadge>
                        </ListItemAvatar>
                        <ListItemText primary={steps[6].text} />
                        <ListItemSecondaryAction>
                          <CBadge
                            color={getBadgeVariant(
                              monthlyGastronomyEvaluation.ind7_CNPE
                            )}
                          >
                            <strong>
                              {monthlyGastronomyEvaluation.ind7_CNPE}
                            </strong>{" "}
                            - {getEval(monthlyGastronomyEvaluation.ind7_CNPE)}
                          </CBadge>
                        </ListItemSecondaryAction>
                      </ListItem>
                    </Tooltip>
                    {/* 25 */}
                    <Tooltip title="Click para ver detalles de este indicador">
                      <ListItem
                        button
                        onClick={handleClickDetails(
                          25,
                          monthlyGastronomyEvaluation.ind25_UCU
                        )}
                      >
                        <ListItemAvatar>
                          <CBadge color={"info"}>25</CBadge>
                        </ListItemAvatar>
                        <ListItemText primary={steps[24].text} />
                        <ListItemSecondaryAction>
                          <CBadge
                            color={getBadgeVariant(
                              monthlyGastronomyEvaluation.ind25_UCU
                            )}
                          >
                            <strong>
                              {monthlyGastronomyEvaluation.ind25_UCU}
                            </strong>{" "}
                            - {getEval(monthlyGastronomyEvaluation.ind25_UCU)}
                          </CBadge>
                        </ListItemSecondaryAction>
                      </ListItem>
                    </Tooltip>
                  </List>
                </div>
              )}

              {/* Step 7 */}
              {activeStep === 6 && (
                <div>
                  <h5 className="text-center text-muted">
                    Capacidad de cambio, iniciativa e interés
                  </h5>

                  <div className="text-center">
                    <FormControl
                      component="fieldset"
                      className="text-center"
                      disabled={onlyShow}
                    >
                      <RadioGroup
                        row
                        value={capaccamb}
                        onChange={(e) => {
                          setCapaccamb(e.target.value);
                          updateEvaluatedSteps(e.target.value);
                        }}
                      >
                        <FormControlLabel
                          value={"7|2|M"}
                          control={<Radio />}
                          label={
                            <CBadge color="danger" className="mt-2">
                              2 - M
                            </CBadge>
                          }
                        />
                        <FormControlLabel
                          value={"7|3|R"}
                          control={<Radio />}
                          label={
                            <CBadge color="warning" className="mt-2">
                              3 - R
                            </CBadge>
                          }
                        />
                        <FormControlLabel
                          value={"7|4|B"}
                          control={<Radio />}
                          label={
                            <CBadge color="info" className="mt-2">
                              4 - B
                            </CBadge>
                          }
                        />
                        <FormControlLabel
                          value={"7|5|MB"}
                          control={<Radio />}
                          label={
                            <CBadge color="success" className="mt-2">
                              5 - MB
                            </CBadge>
                          }
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>

                  <List component="nav" aria-label="secondary mailbox folder">
                    {/* 11 */}
                    <Tooltip title="Click para ver detalles de este indicador">
                      <ListItem
                        button
                        onClick={handleClickDetails(
                          11,
                          monthlyGastronomyEvaluation.ind11_INI
                        )}
                      >
                        <ListItemAvatar>
                          <CBadge color={"info"}>11</CBadge>
                        </ListItemAvatar>
                        <ListItemText primary={steps[10].text} />
                        <ListItemSecondaryAction>
                          <CBadge
                            color={getBadgeVariant(
                              monthlyGastronomyEvaluation.ind11_INI
                            )}
                          >
                            <strong>
                              {monthlyGastronomyEvaluation.ind11_INI}
                            </strong>{" "}
                            - {getEval(monthlyGastronomyEvaluation.ind11_INI)}
                          </CBadge>
                        </ListItemSecondaryAction>
                      </ListItem>
                    </Tooltip>
                    {/* 12 */}
                    <Tooltip title="Click para ver detalles de este indicador">
                      <ListItem
                        button
                        onClick={handleClickDetails(
                          12,
                          monthlyGastronomyEvaluation.ind12_RAP
                        )}
                      >
                        <ListItemAvatar>
                          <CBadge color={"info"}>12</CBadge>
                        </ListItemAvatar>
                        <ListItemText primary={steps[11].text} />
                        <ListItemSecondaryAction>
                          <CBadge
                            color={getBadgeVariant(
                              monthlyGastronomyEvaluation.ind12_RAP
                            )}
                          >
                            <strong>
                              {monthlyGastronomyEvaluation.ind12_RAP}
                            </strong>{" "}
                            - {getEval(monthlyGastronomyEvaluation.ind12_RAP)}
                          </CBadge>
                        </ListItemSecondaryAction>
                      </ListItem>
                    </Tooltip>
                  </List>
                </div>
              )}
            </div>
          </CCardBody>
        )}
        <CCardFooter>
          <MobileStepper
            steps={7}
            position="static"
            variant="text"
            activeStep={activeStep}
            nextButton={
              <Button
                size="small"
                onClick={handleNext}
                disabled={activeStep === 6}
              >
                Siguiente
                <KeyboardArrowRight />
              </Button>
            }
            backButton={
              <Button
                size="small"
                onClick={handleBack}
                disabled={activeStep === 0}
              >
                <KeyboardArrowLeft />
                Anterior
              </Button>
            }
          />
          <div className="mb-3 mt-2">
            <h6 className="text-center text-muted">
              Observaciones extras del trabajador
            </h6>
            <div className="md-form">
              <textarea
                disabled={onlyShow}
                id="form10"
                value={observations}
                onChange={(e) => setObservations(e.target.value)}
                className={
                  onlyShow
                    ? "disabled-normal md-textarea form-control"
                    : "md-textarea form-control"
                }
                rows="8"
                placeholder="Escribe aquí las observaciones"
              ></textarea>
            </div>
          </div>
        </CCardFooter>
      </CCard>

      {onlyShow && (
        <div className="text-center mb-4">
          <ButtonGroup
            variant="contained"
            aria-label="contained primary button group"
          >
            <Button variant="contained" color="primary" onClick={handlePrint}>
              <Print className="mr-2" /> Imprimir Evaluación
            </Button>
            <Button variant="contained" onClick={consultPrintContent}>
              <Visibility className="mr-2" /> Consultar Reporte
            </Button>
          </ButtonGroup>
        </div>
      )}

      {!onlyShow && (activeStep === 7 || evaluatedSteps.length === 7) && (
        <div className="text-center mb-4">
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            {monthlyMeliaEvaluation === null
              ? "Terminar Evaluación"
              : "Editar Evaluación"}
          </Button>
        </div>
      )}

      {evaluatedSteps.length !== 0 && (
        <CCard className="shadow mt-2">
          <CCardHeader>
            <h5 className="text-center text-muted">
              Pasos evaluados del trabajador
            </h5>
          </CCardHeader>
          <CCardBody>
            <List component="nav" aria-label="secondary mailbox folder">
              {evaluatedSteps.map((label, index) => (
                <ListItem
                  key={index}
                  button
                  selected={activeStep === index}
                  onClick={handleClick(index)}
                >
                  <ListItemAvatar>
                    <CBadge color={"info"}>{label.index}</CBadge>
                  </ListItemAvatar>
                  <ListItemText primary={meliaSteps[index].text} />
                  <ListItemSecondaryAction>
                    <CBadge color={getBadgeVariant(label.points)}>
                      <strong>{label.points}</strong> - {label.eval}
                    </CBadge>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </CCardBody>
        </CCard>
      )}
    </div>
  );
}

export default FormContent;
