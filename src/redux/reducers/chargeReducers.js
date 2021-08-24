import {
  CHARGE_LIST_REQUEST,
  CHARGE_LIST_SUCCESS,
  CHARGE_LIST_ERROR,
  CHARGE_LIST_RESET,
  CHARGE_LIST_ZUNPR_REQUEST,
  CHARGE_LIST_ZUNPR_SUCCESS,
  CHARGE_LIST_ZUNPR_ERROR,
  CHARGE_LIST_ZUNPR_RESET,
  CHARGE_LIST_REBUILD_REQUEST,
  CHARGE_LIST_REBUILD_SUCCESS,
  CHARGE_LIST_REBUILD_ERROR,
  CHARGE_LIST_REBUILD_RESET,
} from "../constants/chargeConstants";

export const chargeListReducer = (state = { charges: [] }, action) => {
  switch (action.type) {
    case CHARGE_LIST_REQUEST:
      return { loading: true };

    case CHARGE_LIST_SUCCESS:
      return { loading: false, charges: action.payload };

    case CHARGE_LIST_ERROR:
      return { loading: false, error: action.payload };

    case CHARGE_LIST_RESET:
      return {};

    default:
      return state;
  }
};

export const chargeListZunPrReducer = (state = { charges: [] }, action) => {
  switch (action.type) {
    case CHARGE_LIST_ZUNPR_REQUEST:
      return { loading: true };

    case CHARGE_LIST_ZUNPR_SUCCESS:
      return { loading: false, charges: action.payload, success: true };

    case CHARGE_LIST_ZUNPR_ERROR:
      return { loading: false, error: action.payload };

    case CHARGE_LIST_ZUNPR_RESET:
      return {};

    default:
      return state;
  }
};

export const rebuildChargeListReducer = (state = {}, action) => {
  switch (action.type) {
    case CHARGE_LIST_REBUILD_REQUEST:
      return { loading: true };

    case CHARGE_LIST_REBUILD_SUCCESS:
      return { loading: false, success: true };

    case CHARGE_LIST_REBUILD_ERROR:
      return { loading: false, error: action.payload };

    case CHARGE_LIST_REBUILD_RESET:
      return {};

    default:
      return state;
  }
};
