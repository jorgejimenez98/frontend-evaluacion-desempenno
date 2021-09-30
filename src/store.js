import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

// Reducers Imports
import { sidebarShowReducer } from "./redux/reducers/sideBarReducers";
import { snackbarReducer } from "./redux/reducers/snackbarReducer";

// COIN REDUCERS IMPORTS
import {
  coinListReducer,
  coinListFromPmsReducer,
  rebuildCoinListReducer,
  getCoinReducer,
} from "./redux/reducers/coinReducers";

// USERS REDUCERS IMPORTS
import {
  userLoginReducers,
  userListReducer,
  userDeleteReducer,
  userCreateReducer,
  userDetailsReducers,
  userUpdateReducer,
  userUpdatePasswordReducer,
  userEditUpdatePasswordReducer,
} from "./redux/reducers/userReducers";

// HOTELS REDUCERS IMPORTS
import {
  hotelListReducer,
  addHotelReducer,
  deleteHotelsReducer,
  hotelDetailsReducers,
  editHotelReducer,
} from "./redux/reducers/hotelReducers";

// Family Reducers imports
import {
  familyListReducer,
  familyListFromZunPosReducer,
  updatefamilyListFromZunPosReducer,
  deletefamilyReducer,
  sincronizefamilyReducer,
} from "src/redux/reducers/familyReducers";

// Sell Areas Reducers imports
import {
  sellAreaListReducer,
  sellAreaListFromZunPosReducer,
  sellAreaUpdateReducer,
  sellAreaDeleteReducer,
  sellAreaSincronizeReducer,
  sellAreaRebuildListReducer,
} from "src/redux/reducers/sellAreaReducers";

// Category Reducers Imports
import {
  categoryListReducer,
  sincroCategoryListReducer,
  rebuildListCategoryReducer,
} from "src/redux/reducers/categoryReducers";

// Charges Reducers Imports
import {
  chargeListReducer,
  chargeListZunPrReducer,
  rebuildChargeListReducer,
} from "src/redux/reducers/chargeReducers";

// Worker Reducers Imports
import {
  workerListReducer,
  workerLisFromZunPRtReducer,
  importWorkersReducer,
  deleteWorkersReducer,
  workerSincroReducer,
  rebuildWorkersReducer,
  workerDetailstReducer,
  operatorListReducer,
  setOperatorReducer,
  deleteOperatorReducer,
  evaluatorDetailstReducer,
} from "src/redux/reducers/workerReducers";

// Anual Sale Plans Imports
import {
  anualSalePlanListReducer,
  anualSalePlanDetailsReducer,
  anualSalePlanEditReducer,
  anualSalePlanCreateReducer,
  anualSalePlanDeleteReducer,
  anualSalePlanReportReducer,
} from "src/redux/reducers/anuaSalePlanReducers";

// Monthly Sale Plans Imports
import {
  monthlySalePlanListReducer,
  monthlySalePlanDeleteReducer,
  monthlySalePlanCreateReducer,
  monthlySalePlanDetailsReducer,
  monthlySalePlanEditReducer,
} from "src/redux/reducers/monthlySalePlanReducers";

// Pay Times Imports
import {
  payTimesListReducer,
  payTimesDeleteReducer,
  payTimesZunListReducer,
  payTimesImportReducer,
  payTimesZunSincroReducer,
  payTimesRebuildReducer,
  payTimesDetailsReducer,
} from "src/redux/reducers/payTimesReducers";

// Monthly Evaluations Imports
import {
  monthlyEvaluationsReducers,
  monthlyEvaluationAddReducer,
  monthlyEvaluationDetailsReducer,
  monthlyEvaluationEditReducer,
  monthlyMeliaEvaluationAddReducer,
  monthlyMeliaEvaluationDetailsReducer,
  monthlyMeliaEvaluationEditReducer,
  monthlyMeliaEvaluationResumeReducer,
} from "src/redux/reducers/monthlyEvaluationReducers";

// Anual Evaluations Reducers
import {
  anualEvaluationsListReducer,
  anualEvaluationsAddReducer,
  anualEvaluationsDetailsReducer,
  anualEvaluationsEditReducer,
} from "src/redux/reducers/anualEvaluationReducers";

// Incidents Reducers
import { incidentsReducers } from "src/redux/reducers/incidentsReducers";

// DashBoard Reducers
import {
  numbersReducers,
  evaluationRangeReducer,
  evaluationAnualRangeReducer,
} from "src/redux/reducers/dashboardReducers";

// Obtain the authenticated user from localstorage
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

// Inicial redux Store State
export const initialState = {
  sidebarShow: "responsive",
  userLogin: { userInfo: userInfoFromStorage },
};

// Reducers del Store de Redux
const reducers = combineReducers({
  // Static App Reducers
  snackbar: snackbarReducer,
  sidebarShow: sidebarShowReducer,

  // Users Reducers
  userLogin: userLoginReducers,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userCreate: userCreateReducer,
  userUpdate: userUpdateReducer,
  userDetails: userDetailsReducers,
  userUpdatePassword: userUpdatePasswordReducer,
  userEditUpdatePassword: userEditUpdatePasswordReducer,

  // Hotel Reducers
  hotelList: hotelListReducer,
  addHotel: addHotelReducer,
  deleteHotels: deleteHotelsReducer,
  hotelDetails: hotelDetailsReducers,
  editHotel: editHotelReducer,

  // Family Reducers
  familyList: familyListReducer,
  familyListFromZunPos: familyListFromZunPosReducer,
  updatefamilyListFromZunPos: updatefamilyListFromZunPosReducer,
  deletefamily: deletefamilyReducer,
  sincronizefamily: sincronizefamilyReducer,

  // Sell Area Reducers
  sellAreaList: sellAreaListReducer,
  sellAreaListFromZunPos: sellAreaListFromZunPosReducer,
  sellAreaUpdate: sellAreaUpdateReducer,
  sellAreaDelete: sellAreaDeleteReducer,
  sellAreaSincronize: sellAreaSincronizeReducer,
  sellAreaRebuildList: sellAreaRebuildListReducer,

  // Categories Reducers
  categoryList: categoryListReducer,
  sincroCategoryList: sincroCategoryListReducer,
  rebuildListCategory: rebuildListCategoryReducer,

  // Charge Reducers
  chargeList: chargeListReducer,
  chargeListZunPr: chargeListZunPrReducer,
  rebuildChargeList: rebuildChargeListReducer,

  // Coin Reducers
  coinListReducer: coinListReducer,
  coinListFromPms: coinListFromPmsReducer,
  rebuildCoinList: rebuildCoinListReducer,
  activeCoin: getCoinReducer,

  // Worker Reducers
  workerList: workerListReducer,
  workerLisFromZunPR: workerLisFromZunPRtReducer,
  importWorkers: importWorkersReducer,
  deleteWorkers: deleteWorkersReducer,
  workerSincro: workerSincroReducer,
  rebuildWorkers: rebuildWorkersReducer,
  workerDetails: workerDetailstReducer,
  operatorList: operatorListReducer,
  setOperator: setOperatorReducer,
  deleteOperator: deleteOperatorReducer,
  evaluatorDetails: evaluatorDetailstReducer,

  // Anual Sale Plans Reducers
  anualSalePlanList: anualSalePlanListReducer,
  anualSalePlanDetails: anualSalePlanDetailsReducer,
  anualSalePlanEdit: anualSalePlanEditReducer,
  anualSalePlanCreate: anualSalePlanCreateReducer,
  anualSalePlanDelete: anualSalePlanDeleteReducer,
  anualSalePlanReport: anualSalePlanReportReducer,

  // Monthly Sale Reducers
  monthlySalePlanList: monthlySalePlanListReducer,
  monthlySalePlanDelete: monthlySalePlanDeleteReducer,
  monthlySalePlanCreate: monthlySalePlanCreateReducer,
  monthlySalePlanDetails: monthlySalePlanDetailsReducer,
  monthlySalePlanEdit: monthlySalePlanEditReducer,

  // Pay Times Reducers
  payTimesList: payTimesListReducer,
  payTimesDelete: payTimesDeleteReducer,
  payTimesZunList: payTimesZunListReducer,
  payTimesImport: payTimesImportReducer,
  payTimesZunSincro: payTimesZunSincroReducer,
  payTimesRebuild: payTimesRebuildReducer,
  payTimesDetails: payTimesDetailsReducer,

  // Monthly Evaluations Reducers
  monthlyEvaluations: monthlyEvaluationsReducers,
  monthlyEvaluationAdd: monthlyEvaluationAddReducer,
  monthlyEvaluationDetails: monthlyEvaluationDetailsReducer,
  monthlyEvaluationEdit: monthlyEvaluationEditReducer,
  monthlyMeliaEvaluationAdd: monthlyMeliaEvaluationAddReducer,
  monthlyMeliaEvaluationDetails: monthlyMeliaEvaluationDetailsReducer,
  monthlyMeliaEvaluationEdit: monthlyMeliaEvaluationEditReducer,
  monthlyMeliaEvaluationResume: monthlyMeliaEvaluationResumeReducer,

  // Anual Evaluations Reducers
  anualEvaluationsList: anualEvaluationsListReducer,
  anualEvaluationsAdd: anualEvaluationsAddReducer,
  anualEvaluationsDetails: anualEvaluationsDetailsReducer,
  anualEvaluationsEdit: anualEvaluationsEditReducer,

  // Incidents Reducers
  incidents: incidentsReducers,

  // DashBoard Reducers:
  numbers: numbersReducers,
  evaluationRange: evaluationRangeReducer,
  evaluationAnualRange: evaluationAnualRangeReducer,
});

const middleware = [thunk];

// Creacion del Store
const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
