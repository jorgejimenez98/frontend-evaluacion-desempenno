import {
  COIN_LIST_REQUEST,
  COIN_LIST_SUCCESS,
  COIN_LIST_ERROR,
  COIN_LIST_RESET,
  GET_COIN_REQUEST,
  GET_COIN_SUCCESS,
  GET_COIN_ERROR,
  GET_COIN_RESET,
  COIN_LIST_FROM_PMS_REQUEST,
  COIN_LIST_FROM_PMS_SUCCESS,
  COIN_LIST_FROM_PMS_ERROR,
  COIN_LIST_FROM_PMS_RESET,
  COIN_LIST_REBUILD_REQUEST,
  COIN_LIST_REBUILD_SUCCESS,
  COIN_LIST_REBUILD_ERROR,
  COIN_LIST_REBUILD_RESET,
} from "src/redux/constants/coinConstants";

export const coinListReducer = (state = { coins: [] }, action) => {
  switch (action.type) {
    case COIN_LIST_REQUEST:
      return { loading: true };

    case COIN_LIST_SUCCESS:
      return { loading: false, coins: action.payload };

    case COIN_LIST_ERROR:
      return { loading: false, error: action.payload };

    case COIN_LIST_RESET:
      return {};

    default:
      return state;
  }
};

export const coinListFromPmsReducer = (state = { coins: [] }, action) => {
  switch (action.type) {
    case COIN_LIST_FROM_PMS_REQUEST:
      return { loading: true };

    case COIN_LIST_FROM_PMS_SUCCESS:
      return { loading: false, coins: action.payload, success: true };

    case COIN_LIST_FROM_PMS_ERROR:
      return { loading: false, error: action.payload };

    case COIN_LIST_FROM_PMS_RESET:
      return {};

    default:
      return state;
  }
};

export const rebuildCoinListReducer = (state = {}, action) => {
  switch (action.type) {
    case COIN_LIST_REBUILD_REQUEST:
      return { loading: true };

    case COIN_LIST_REBUILD_SUCCESS:
      return { loading: false, success: true };

    case COIN_LIST_REBUILD_ERROR:
      return { loading: false, error: action.payload };

    case COIN_LIST_REBUILD_RESET:
      return {};

    default:
      return state;
  }
};

export const getCoinReducer = (state = { coin: {} }, action) => {
  switch (action.type) {
    case GET_COIN_REQUEST:
      return { loading: true };

    case GET_COIN_SUCCESS:
      return { loading: false, coin: action.payload };

    case GET_COIN_ERROR:
      return { loading: false, error: action.payload };

    case GET_COIN_RESET:
      return {};

    default:
      return state;
  }
};
