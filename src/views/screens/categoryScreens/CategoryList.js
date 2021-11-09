import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { columns } from "./listColumns";
import { setSnackbar } from "src/redux/reducers/snackbarReducer";
import ReplayRoundedIcon from "@material-ui/icons/ReplayRounded";
import {
  Loader,
  Message,
  listOptions,
  MUIDataTable,
  ReloadButtonListHeader,
} from "src/containers/utils/index";
import {
  getCategoryList,
  sincroCategoryList,
  rebuildCategoryList,
} from "src/redux/actions/categoryActions";
import {
  CATEGORY_REBUILD_LIST_RESET,
  CATEGORY_SINCRO_RESET,
} from "src/redux/constants/categoryConstants";
import {
  redirectLogin,
  tokenhasExpired,
} from "src/containers/utils/userloginsettings.js";

function CategoryList({ history }) {
  const dispatch = useDispatch();

  // User Login Selector
  const { userInfo } = useSelector((state) => state.userLogin);
  // Category List Selector
  const { loading, error, categories } = useSelector(
    (state) => state.categoryList
  );
  // Sincro List Selector
  const {
    loading: loadingSincro,
    error: errorSincro,
    categories: newData,
    success: successSincro,
  } = useSelector((state) => state.sincroCategoryList);
  // Rebuild List Selector
  const {
    loading: loadingRebuild,
    error: errorRebuild,
    success: successRebuild,
  } = useSelector((state) => state.rebuildListCategory);

  if (successSincro) {
    dispatch(rebuildCategoryList(newData));
    dispatch({ type: CATEGORY_SINCRO_RESET });
  }

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
        const message = "Lista sincronizada satisfactoriamente";
        dispatch(setSnackbar(true, "success", message));
        dispatch({ type: CATEGORY_REBUILD_LIST_RESET });
      }
      dispatch(getCategoryList());
    }
  }, [dispatch, userInfo, history, successSincro, successRebuild]);

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
        title="Sincronizar Categorías desde el ZunPr"
        onClick={() => {
          dispatch(sincroCategoryList());
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
        categories && (
          <React.Fragment>
            {categories.length === 0 && (
              <Message variant="info">
                Por favor, presione el botón <ReplayRoundedIcon /> para sincronizar
                las <strong>Categorías Ocupacionales</strong> desde el ZUN
              </Message>
            )}

            {loadingSincro && <Loader />}
            {loadingRebuild && <Loader />}
            {errorSincro && <Message variant="danger">{errorSincro}</Message>}
            {errorRebuild && <Message variant="danger">{errorRebuild}</Message>}

            <MUIDataTable
              title={`Listado de Categorías Ocupacionales (${categories.length})`}
              data={categories}
              columns={columns}
              options={listOptions}
            />
          </React.Fragment>
        )
      )}
    </React.Fragment>
  );
}

export default CategoryList;
