import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { columns } from "./listColumns";
import { setSnackbar } from "src/redux/reducers/snackbarReducer";
import {
  Loader,
  Message,
  listOptions,
  MUIDataTable,
  ReloadButtonListHeader,
} from "src/containers/utils/index";
import {
  getChargesList,
  getChargeListFromZunPr,
  rebuildChargeList,
} from "src/redux/actions/chargeActions";
import {
  CHARGE_LIST_REBUILD_RESET,
  CHARGE_LIST_ZUNPR_RESET,
} from "src/redux/constants/chargeConstants";

function ChargeList({ history }) {
  const dispatch = useDispatch();

  // User Login Selector
  const { userInfo } = useSelector((state) => state.userLogin);
  // Charges List Selector
  const { loading, error, charges } = useSelector((state) => state.chargeList);
  // Charges from Zun PR Selector
  const {
    loading: loadingPR,
    error: errorPR,
    success: successPR,
    charges: newData,
  } = useSelector((state) => state.chargeListZunPr);
  // Rebuild Charges Selector
  const {
    loading: loadingRebuild,
    error: errorRebuild,
    success: successRebuild,
  } = useSelector((state) => state.rebuildChargeList);

  if (successPR) {
    dispatch(rebuildChargeList(newData));
    dispatch({ type: CHARGE_LIST_ZUNPR_RESET });
  }

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else if (!userInfo.isFoodAndDrinkBoss) {
      history.push("/403");
    } else {
      if (successRebuild) {
        const message = "Cargos sincronizados satisfactoriamente";
        dispatch(setSnackbar(true, "success", message));
        dispatch({ type: CHARGE_LIST_REBUILD_RESET });
      }
      dispatch(getChargesList());
    }
    return () => {
      dispatch({ type: CHARGE_LIST_REBUILD_RESET });
    }
  }, [dispatch, userInfo, history, successPR, successRebuild]);

  // Remover Several Defaults Icons From Mui Datatable
  listOptions.selectableRows = "none";
  listOptions.download = false;
  listOptions.print = false;
  listOptions.viewColumns = false;
  listOptions.filter = true;

  // Add Buttom to insert users to the table
  listOptions.customToolbar = () => {
    return (
      <ReloadButtonListHeader
        title="Sincronizar Cargos desde el ZunPr"
        onClick={() => {
          dispatch(getChargeListFromZunPr());
        }}
      />
    );
  };

  return (
    <React.Fragment>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <React.Fragment>
          {charges?.length === 0 && (
            <Message variant="info">
              Por favor, presione el botón de sincronización para cargar los{" "}
              <strong>Cargos Del Zun PR</strong>
            </Message>
          )}

          {loadingPR && <Loader />}
          {loadingRebuild && <Loader />}
          {errorPR && <Message variant="danger">{errorPR}</Message>}
          {errorRebuild && <Message variant="danger">{errorRebuild}</Message>}

          <MUIDataTable
            title={`Listado de Cargos del ZunPr (${charges?.length})`}
            data={charges}
            columns={columns}
            options={listOptions}
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default ChargeList;
