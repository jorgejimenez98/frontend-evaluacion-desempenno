import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { columns } from "./options/listColumns";
// Actions
import { getAnualEvaluationList } from "src/redux/actions/anualEvaluationActions";
import { getHotelDetails } from "src/redux/actions/hotelActions";
// Constants
import { HOTEL_DETAILS_RESET } from "src/redux/constants/hotelConstants";
// Components
import { CFormGroup, CLabel, CCol } from "@coreui/react";
import { FormControl, Select, MenuItem } from "@material-ui/core";
import { BootstrapInput } from "../monthlySalePlanScreens/options/styles";
import {
  Message,
  Loader,
  listOptions,
  MUIDataTable,
} from "src/containers/utils/index";

function AnualEvaluationsList({ match, history }) {
  const hotelId = match.params.hotelId;
  const dispatch = useDispatch();

  // My States
  const [selectedYear, setSelectedYear] = useState(
    Number(new Date().getFullYear())
  );
  const [plusYears, setPlusYears] = useState([]);
  const [beforeYears, setBeforeYears] = useState([]);
  const [listInitialized, setListInitialized] = useState(false);

  // Selectors
  // User login Selector
  const { userInfo } = useSelector((state) => state.userLogin);

  // Hotel Details Selector
  const { error: errorHotel, hotel } = useSelector(
    (state) => state.hotelDetails
  );

  // Evaluations List Selector
  const {
    loading: loadingList,
    error: errorList,
    anualEvaluations,
  } = useSelector((state) => state.anualEvaluationsList);

  const updateOldYears = (year) => {
    const years = Array.from(new Array(5), (val, index) => year - index);
    setBeforeYears(years);
  };

  const updatePlusYears = (year) => {
    const years = Array.from(
      new Array(5),
      (val, index) => year + index
    ).reverse();
    const years1 = years.filter((y) => y !== year);
    setPlusYears(years1);
  };

  // Init years
  if (beforeYears.length === 0) {
    updateOldYears(Number(new Date().getFullYear()));
  }

  if (plusYears.length === 0) {
    updatePlusYears(Number(new Date().getFullYear()));
  }

  // Init Actual Year
  if (!listInitialized && hotelId) {
    setListInitialized(true);
    dispatch(getAnualEvaluationList({ hotelId, newYear: selectedYear }));
  }

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else if (!userInfo.isFoodAndDrinkBoss) {
      history.push("/403");
    } else {
      if (hotelId) {
        dispatch(getHotelDetails(hotelId, true));
      }
    }
    return () => {
      setListInitialized(false);
      setSelectedYear(Number(new Date().getFullYear()));
      updateOldYears(new Date().getFullYear());
      updatePlusYears(new Date().getFullYear());
      dispatch({ type: HOTEL_DETAILS_RESET });
    };
  }, [dispatch, history, userInfo, hotelId]);

  const handleYearChangeChange = (e) => {
    const newYear = e.target.value;
    setSelectedYear(newYear);
    updateOldYears(newYear);
    updatePlusYears(newYear);
    dispatch(getAnualEvaluationList({ hotelId, newYear }));
  };

  // Remover Several Defaults Icons From Mui Datatable
  listOptions.selectableRows = "none";
  listOptions.download = false;
  listOptions.print = false;
  listOptions.viewColumns = false;
  listOptions.filter = true;

  listOptions.customToolbar = () => {
    return;
  };

  // Add method on Rows delete to the table
  listOptions.customToolbarSelect = () => {
    return;
  };

  return (
    <div>
      <h4 className="text-center text-muted mb-3">
        Evaluaciónes Anuales del <strong>{hotel?.name}</strong>
      </h4>

      {errorHotel && <Message variant="danger">{errorHotel}</Message>}

      {/* Select year section */}

      <CFormGroup row>
        <CCol md="3">
          <CLabel className="mt-2">
            Seleccione un <strong>Año</strong>
          </CLabel>
        </CCol>
        <CCol xs="12" md="9">
          <FormControl style={{ width: "100%" }}>
            <Select
              value={selectedYear}
              onChange={handleYearChangeChange}
              input={<BootstrapInput />}
            >
              {plusYears.map((item, index) => (
                <MenuItem value={item} key={index}>
                  {item}
                </MenuItem>
              ))}
              {beforeYears.map((item, index) => (
                <MenuItem value={item} key={index}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </CCol>
      </CFormGroup>

      {/* List Section */}
      {loadingList ? (
        <Loader />
      ) : errorList ? (
        <Message variant="danger">{errorList}</Message>
      ) : (
        anualEvaluations && (
          <div className="mb-3">
            <MUIDataTable
              title={`Listado de Evaluaciones Anuales del año ${selectedYear}`}
              data={anualEvaluations}
              columns={columns}
              options={listOptions}
            />
          </div>
        )
      )}
    </div>
  );
}

export default AnualEvaluationsList;
