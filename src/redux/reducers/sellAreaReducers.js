import {
  SELL_AREA_LIST_REQUEST,
  SELL_AREA_LIST_SUCCESS,
  SELL_AREA_LIST_ERROR,
  SELL_AREA_LIST_RESET,
  SELL_AREA_LIST_FROM_ZUNPOS_REQUEST,
  SELL_AREA_LIST_FROM_ZUNPOS_SUCCESS,
  SELL_AREA_LIST_FROM_ZUNPOS_ERROR,
  SELL_AREA_LIST_FROM_ZUNPOS_RESET,
  SELL_AREA_UPDATE_REQUEST,
  SELL_AREA_UPDATE_SUCCESS,
  SELL_AREA_UPDATE_ERROR,
  SELL_AREA_UPDATE_RESET,
  SELL_AREA_DELETE_REQUEST,
  SELL_AREA_DELETE_SUCCESS,
  SELL_AREA_DELETE_ERROR,
  SELL_AREA_DELETE_RESET,
  SELL_AREA_SINCRONIZE_REQUEST,
  SELL_AREA_SINCRONIZE_SUCCESS,
  SELL_AREA_SINCRONIZE_ERROR,
  SELL_AREA_SINCRONIZE_RESET,
  SELL_AREA_REBUILD_LIST_REQUEST,
  SELL_AREA_REBUILD_LIST_SUCCESS,
  SELL_AREA_REBUILD_LIST_ERROR,
  SELL_AREA_REBUILD_LIST_RESET,
} from "../constants/sellAreaConstants";

export const sellAreaListReducer = (state = { sellAreas: [] }, action) => {
  switch (action.type) {
    case SELL_AREA_LIST_REQUEST:
      return { loading: true };

    case SELL_AREA_LIST_SUCCESS:
      return { loading: false, sellAreas: action.payload };

    case SELL_AREA_LIST_ERROR:
      return { loading: false, error: action.payload };

    case SELL_AREA_LIST_RESET:
      return {};

    default:
      return state;
  }
};

export const sellAreaListFromZunPosReducer = (
  state = { sellAreas: [] },
  action
) => {
  switch (action.type) {
    case SELL_AREA_LIST_FROM_ZUNPOS_REQUEST:
      return { loading: true };

    case SELL_AREA_LIST_FROM_ZUNPOS_SUCCESS:
      return { loading: false, sellAreas: action.payload };

    case SELL_AREA_LIST_FROM_ZUNPOS_ERROR:
      return { loading: false, error: action.payload };

    case SELL_AREA_LIST_FROM_ZUNPOS_RESET:
      return {};

    default:
      return state;
  }
};

export const sellAreaUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case SELL_AREA_UPDATE_REQUEST:
      return { loading: true };

    case SELL_AREA_UPDATE_SUCCESS:
      return { loading: false, success: true };

    case SELL_AREA_UPDATE_ERROR:
      return { loading: false, error: action.payload };

    case SELL_AREA_UPDATE_RESET:
      return {};

    default:
      return state;
  }
};

export const sellAreaDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case SELL_AREA_DELETE_REQUEST:
      return { loading: true };

    case SELL_AREA_DELETE_SUCCESS:
      return { loading: false, success: true };

    case SELL_AREA_DELETE_ERROR:
      return { loading: false, error: action.payload };

    case SELL_AREA_DELETE_RESET:
      return {};

    default:
      return state;
  }
};


export const sellAreaSincronizeReducer = (state = {newData: []}, action) => {
  switch (action.type) {
    case SELL_AREA_SINCRONIZE_REQUEST:
      return { loading: true };

    case SELL_AREA_SINCRONIZE_SUCCESS:
      return { loading: false, newData: action.payload, success: true };

    case SELL_AREA_SINCRONIZE_ERROR:
      return { loading: false, error: action.payload };

    case SELL_AREA_SINCRONIZE_RESET:
      return {};

    default:
      return state;
  }
};


export const sellAreaRebuildListReducer = (state = {}, action) => {
  switch (action.type) {
    case SELL_AREA_REBUILD_LIST_REQUEST:
      return { loading: true };

    case SELL_AREA_REBUILD_LIST_SUCCESS:
      return { loading: false, success: true };

    case SELL_AREA_REBUILD_LIST_ERROR:
      return { loading: false, error: action.payload };

    case SELL_AREA_REBUILD_LIST_RESET:
      return {};

    default:
      return state;
  }
};
