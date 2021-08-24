import {
  ANUAL_SALE_PLAN_LIST_REQUEST,
  ANUAL_SALE_PLAN_LIST_SUCCESS,
  ANUAL_SALE_PLAN_LIST_ERROR,
  ANUAL_SALE_PLAN_LIST_RESET,
  ANUAL_SALE_PLAN_DELETE_REQUEST,
  ANUAL_SALE_PLAN_DELETE_SUCCESS,
  ANUAL_SALE_PLAN_DELETE_ERROR,
  ANUAL_SALE_PLAN_DELETE_RESET,
  ANUAL_SALE_PLAN_CREATE_REQUEST,
  ANUAL_SALE_PLAN_CREATE_SUCCESS,
  ANUAL_SALE_PLAN_CREATE_ERROR,
  ANUAL_SALE_PLAN_CREATE_RESET,
  ANUAL_SALE_PLAN_DETAILS_REQUEST,
  ANUAL_SALE_PLAN_DETAILS_SUCCESS,
  ANUAL_SALE_PLAN_DETAILS_ERROR,
  ANUAL_SALE_PLAN_DETAILS_RESET,
  ANUAL_SALE_PLAN_EDIT_REQUEST,
  ANUAL_SALE_PLAN_EDIT_SUCCESS,
  ANUAL_SALE_PLAN_EDIT_ERROR,
  ANUAL_SALE_PLAN_EDIT_RESET,
  ANUAL_SALE_PLAN_REPORT_REQUEST,
  ANUAL_SALE_PLAN_REPORT_SUCCESS,
  ANUAL_SALE_PLAN_REPORT_ERROR,
  ANUAL_SALE_PLAN_REPORT_RESET,
} from "../constants/anuaSalePlanConstants";

export const anualSalePlanListReducer = (
  state = { anualSalePlans: [] },
  action
) => {
  switch (action.type) {
    case ANUAL_SALE_PLAN_LIST_REQUEST:
      return { loading: true };

    case ANUAL_SALE_PLAN_LIST_SUCCESS:
      return { loading: false, anualSalePlans: action.payload };

    case ANUAL_SALE_PLAN_LIST_ERROR:
      return { loading: false, error: action.payload };

    case ANUAL_SALE_PLAN_LIST_RESET:
      return {};

    default:
      return state;
  }
};

export const anualSalePlanDetailsReducer = (
  state = { anualSalePlan: {} },
  action
) => {
  switch (action.type) {
    case ANUAL_SALE_PLAN_DETAILS_REQUEST:
      return { loading: true };

    case ANUAL_SALE_PLAN_DETAILS_SUCCESS:
      return { loading: false, anualSalePlan: action.payload };

    case ANUAL_SALE_PLAN_DETAILS_ERROR:
      return { loading: false, error: action.payload };

    case ANUAL_SALE_PLAN_DETAILS_RESET:
      return {};

    default:
      return state;
  }
};

export const anualSalePlanEditReducer = (state = {}, action) => {
  switch (action.type) {
    case ANUAL_SALE_PLAN_EDIT_REQUEST:
      return { loading: true };

    case ANUAL_SALE_PLAN_EDIT_SUCCESS:
      return { loading: false, success: true };

    case ANUAL_SALE_PLAN_EDIT_ERROR:
      return { loading: false, error: action.payload };

    case ANUAL_SALE_PLAN_EDIT_RESET:
      return {};

    default:
      return state;
  }
};

export const anualSalePlanDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ANUAL_SALE_PLAN_DELETE_REQUEST:
      return { loading: true };

    case ANUAL_SALE_PLAN_DELETE_SUCCESS:
      return { loading: false, success: true };

    case ANUAL_SALE_PLAN_DELETE_ERROR:
      return { loading: false, error: action.payload };

    case ANUAL_SALE_PLAN_DELETE_RESET:
      return {};

    default:
      return state;
  }
};

export const anualSalePlanCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ANUAL_SALE_PLAN_CREATE_REQUEST:
      return { loading: true };

    case ANUAL_SALE_PLAN_CREATE_SUCCESS:
      return { loading: false, success: true };

    case ANUAL_SALE_PLAN_CREATE_ERROR:
      return { loading: false, error: action.payload };

    case ANUAL_SALE_PLAN_CREATE_RESET:
      return {};

    default:
      return state;
  }
};

export const anualSalePlanReportReducer = (state = { data: [] }, action) => {
  switch (action.type) {
    case ANUAL_SALE_PLAN_REPORT_REQUEST:
      return { loading: true };

    case ANUAL_SALE_PLAN_REPORT_SUCCESS:
      return { loading: false, data: action.payload };

    case ANUAL_SALE_PLAN_REPORT_ERROR:
      return { loading: false, error: action.payload };

    case ANUAL_SALE_PLAN_REPORT_RESET:
      return {};

    default:
      return state;
  }
};
