import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { columns } from "./columns";
import {
  COIN_LIST_FROM_PMS_RESET,
  COIN_LIST_REBUILD_RESET,
} from "src/redux/constants/coinConstants";
import { setSnackbar } from "src/redux/reducers/snackbarReducer";
import {
  Loader,
  Message,
  listOptions,
  MUIDataTable,
  ReloadButtonListHeader,
} from "src/containers/utils/index";
import {
  getCoinList,
  getCoinListFromPms,
  rebuilMyCoinList,
} from "src/redux/actions/coinActions";
import {
  redirectLogin,
  tokenhasExpired,
} from "src/containers/utils/userloginsettings.js";

function CoinList({ history }) {
  const dispatch = useDispatch();

  // User Login Selector
  const { userInfo } = useSelector((state) => state.userLogin);

  // Coin List Selector
  const { loading, error, coins } = useSelector(
    (state) => state.coinListReducer
  );
  // Coin list from PMS selector
  const {
    loading: loadingSincro,
    error: errorSincro,
    coins: newData,
    success,
  } = useSelector((state) => state.coinListFromPms);
  // Coins Rebuild Selector
  const {
    loading: loadingRebuild,
    error: errorRebuild,
    success: successRebuild,
  } = useSelector((state) => state.rebuildCoinList);

  if (success) {
    dispatch(rebuilMyCoinList(newData));
    dispatch({ type: COIN_LIST_FROM_PMS_RESET });
  }

  // Use Effect
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else if (!userInfo.isFoodAndDrinkBoss) {
      history.push("/403");
    } else {
      if (tokenhasExpired(userInfo)) {
        redirectLogin(history, dispatch);
      }
      if (successRebuild) {
        const message = "Moneda base cargada satisfactoriamente";
        dispatch(setSnackbar(true, "success", message));
        dispatch({ type: COIN_LIST_REBUILD_RESET });
      }
      dispatch(getCoinList());
    }
  }, [dispatch, userInfo, history, success, successRebuild]);

  // Remover Several Defaults Icons From Mui Datatable
  listOptions.selectableRows = "none";
  listOptions.download = false;
  listOptions.print = false;
  listOptions.viewColumns = false;
  listOptions.filter = false;

  // Add Buttom to insert users to the table
  listOptions.customToolbar = () => {
    return (
      <ReloadButtonListHeader
        title="Sincronizar Moneda Base del PMS"
        onClick={() => {
          dispatch(getCoinListFromPms());
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
          {loadingSincro && <Loader />}
          {loadingRebuild && <Loader />}
          {errorSincro && <Message variant="danger">{errorSincro}</Message>}
          {errorRebuild && <Message variant="danger">{errorRebuild}</Message>}

          <MUIDataTable
            title={`Listado de Monedas (${coins?.length})`}
            data={coins}
            columns={columns}
            options={listOptions}
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default CoinList;
