import {
  PAYTIMES_LIST_REQUEST,
  PAYTIMES_LIST_SUCCESS,
  PAYTIMES_LIST_ERROR,
  PAYTIMES_LIST_RESET,
  PAYTIMES_ZUN_LIST_REQUEST,
  PAYTIMES_ZUN_LIST_SUCCESS,
  PAYTIMES_ZUN_LIST_ERROR,
  PAYTIMES_ZUN_LIST_RESET,
  PAYTIMES_IMPORT_REQUEST,
  PAYTIMES_IMPORT_SUCCESS,
  PAYTIMES_IMPORT_ERROR,
  PAYTIMES_IMPORT_RESET,
  PAYTIMES_SINCRO_REQUEST,
  PAYTIMES_SINCRO_SUCCESS,
  PAYTIMES_SINCRO_ERROR,
  PAYTIMES_SINCRO_RESET,
  PAYTIMES_DELETE_REQUEST,
  PAYTIMES_DELETE_SUCCESS,
  PAYTIMES_DELETE_ERROR,
  PAYTIMES_DELETE_RESET,
  PAYTIMES_REBUILD_REQUEST,
  PAYTIMES_REBUILD_SUCCESS,
  PAYTIMES_REBUILD_ERROR,
  PAYTIMES_REBUILD_RESET,
  PAYTIMES_DETAILS_REQUEST,
  PAYTIMES_DETAILS_SUCCESS,
  PAYTIMES_DETAILS_ERROR,
  PAYTIMES_DETAILS_RESET,
} from "../constants/payTimesConstants";

export const payTimesListReducer = (state = { payTimes: [] }, action) => {
  switch (action.type) {
    case PAYTIMES_LIST_REQUEST:
      return { loading: true };

    case PAYTIMES_LIST_SUCCESS:
      return { loading: false, payTimes: action.payload };

    case PAYTIMES_LIST_ERROR:
      return { loading: false, error: action.payload };

    case PAYTIMES_LIST_RESET:
      return {};

    default:
      return state;
  }
};

export const payTimesZunListReducer = (state = { payTimes: [] }, action) => {
  switch (action.type) {
    case PAYTIMES_ZUN_LIST_REQUEST:
      return { loading: true };

    case PAYTIMES_ZUN_LIST_SUCCESS:
      return { loading: false, payTimes: action.payload };

    case PAYTIMES_ZUN_LIST_ERROR:
      return { loading: false, error: action.payload };

    case PAYTIMES_ZUN_LIST_RESET:
      return {};

    default:
      return state;
  }
};

export const payTimesDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PAYTIMES_DELETE_REQUEST:
      return { loading: true };

    case PAYTIMES_DELETE_SUCCESS:
      return { loading: false, success: true };

    case PAYTIMES_DELETE_ERROR:
      return { loading: false, error: action.payload };

    case PAYTIMES_DELETE_RESET:
      return {};

    default:
      return state;
  }
};

export const payTimesImportReducer = (state = {}, action) => {
  switch (action.type) {
    case PAYTIMES_IMPORT_REQUEST:
      return { loading: true };

    case PAYTIMES_IMPORT_SUCCESS:
      return { loading: false, success: true };

    case PAYTIMES_IMPORT_ERROR:
      return { loading: false, error: action.payload };

    case PAYTIMES_IMPORT_RESET:
      return {};

    default:
      return state;
  }
};

export const payTimesZunSincroReducer = (state = { newData: [] }, action) => {
  switch (action.type) {
    case PAYTIMES_SINCRO_REQUEST:
      return { loading: true };

    case PAYTIMES_SINCRO_SUCCESS:
      return { loading: false, newData: action.payload, success: true };

    case PAYTIMES_SINCRO_ERROR:
      return { loading: false, error: action.payload };

    case PAYTIMES_SINCRO_RESET:
      return {};

    default:
      return state;
  }
};

export const payTimesRebuildReducer = (state = {}, action) => {
  switch (action.type) {
    case PAYTIMES_REBUILD_REQUEST:
      return { loading: true };

    case PAYTIMES_REBUILD_SUCCESS:
      return { loading: false, success: true };

    case PAYTIMES_REBUILD_ERROR:
      return { loading: false, error: action.payload };

    case PAYTIMES_REBUILD_RESET:
      return {};

    default:
      return state;
  }
};

export const payTimesDetailsReducer = (state = { payTime: {} }, action) => {
  switch (action.type) {
    case PAYTIMES_DETAILS_REQUEST:
      return { loading: true };

    case PAYTIMES_DETAILS_SUCCESS:
      return { loading: false, payTime: action.payload };

    case PAYTIMES_DETAILS_ERROR:
      return { loading: false, error: action.payload };

    case PAYTIMES_DETAILS_RESET:
      return {};

    default:
      return state;
  }
};
