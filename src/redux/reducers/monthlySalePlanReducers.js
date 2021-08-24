import {
  MONTHLY_SALE_PLAN_LIST_REQUEST,
  MONTHLY_SALE_PLAN_LIST_SUCCESS,
  MONTHLY_SALE_PLAN_LIST_ERROR,
  MONTHLY_SALE_PLAN_LIST_RESET,
  MONTHLY_SALE_PLAN_DELETE_REQUEST,
  MONTHLY_SALE_PLAN_DELETE_SUCCESS,
  MONTHLY_SALE_PLAN_DELETE_ERROR,
  MONTHLY_SALE_PLAN_DELETE_RESET,
  MONTHLY_SALE_PLAN_CREATE_REQUEST,
  MONTHLY_SALE_PLAN_CREATE_SUCCESS,
  MONTHLY_SALE_PLAN_CREATE_ERROR,
  MONTHLY_SALE_PLAN_CREATE_RESET,
  MONTHLY_SALE_PLAN_DETAILS_REQUEST,
  MONTHLY_SALE_PLAN_DETAILS_SUCCESS,
  MONTHLY_SALE_PLAN_DETAILS_ERROR,
  MONTHLY_SALE_PLAN_DETAILS_RESET,
  MONTHLY_SALE_PLAN_EDIT_REQUEST,
  MONTHLY_SALE_PLAN_EDIT_SUCCESS,
  MONTHLY_SALE_PLAN_EDIT_ERROR,
  MONTHLY_SALE_PLAN_EDIT_RESET,
} from "../constants/monthlySalePlanConstants";

export const monthlySalePlanListReducer = (
  state = { monhtlySalePlans: [] },
  action
) => {
  switch (action.type) {
    case MONTHLY_SALE_PLAN_LIST_REQUEST:
      return { loading: true };

    case MONTHLY_SALE_PLAN_LIST_SUCCESS:
      return { loading: false, monhtlySalePlans: action.payload };

    case MONTHLY_SALE_PLAN_LIST_ERROR:
      return { loading: false, error: action.payload };

    case MONTHLY_SALE_PLAN_LIST_RESET:
      return {};

    default:
      return state;
  }
};

export const monthlySalePlanDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case MONTHLY_SALE_PLAN_DELETE_REQUEST:
      return { loading: true };

    case MONTHLY_SALE_PLAN_DELETE_SUCCESS:
      return { loading: false, success: true };

    case MONTHLY_SALE_PLAN_DELETE_ERROR:
      return { loading: false, error: action.payload };

    case MONTHLY_SALE_PLAN_DELETE_RESET:
      return {};

    default:
      return state;
  }
};

export const monthlySalePlanCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case MONTHLY_SALE_PLAN_CREATE_REQUEST:
      return { loading: true };

    case MONTHLY_SALE_PLAN_CREATE_SUCCESS:
      return { loading: false, success: true };

    case MONTHLY_SALE_PLAN_CREATE_ERROR:
      return { loading: false, error: action.payload };

    case MONTHLY_SALE_PLAN_CREATE_RESET:
      return {};

    default:
      return state;
  }
};

export const monthlySalePlanDetailsReducer = (
  state = { monhtlySalePlan: [] },
  action
) => {
  switch (action.type) {
    case MONTHLY_SALE_PLAN_DETAILS_REQUEST:
      return { loading: true };

    case MONTHLY_SALE_PLAN_DETAILS_SUCCESS:
      return { loading: false, monhtlySalePlan: action.payload };

    case MONTHLY_SALE_PLAN_DETAILS_ERROR:
      return { loading: false, error: action.payload };

    case MONTHLY_SALE_PLAN_DETAILS_RESET:
      return {};

    default:
      return state;
  }
};

export const monthlySalePlanEditReducer = (state = {}, action) => {
  switch (action.type) {
    case MONTHLY_SALE_PLAN_EDIT_REQUEST:
      return { loading: true };

    case MONTHLY_SALE_PLAN_EDIT_SUCCESS:
      return { loading: false, success: true };

    case MONTHLY_SALE_PLAN_EDIT_ERROR:
      return { loading: false, error: action.payload };

    case MONTHLY_SALE_PLAN_EDIT_RESET:
      return {};

    default:
      return state;
  }
};
