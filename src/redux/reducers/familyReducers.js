import {
  FAMILY_LIST_REQUEST,
  FAMILY_LIST_SUCCESS,
  FAMILY_LIST_ERROR,
  FAMILY_LIST_RESET,
  FAMILY_LIST_FROM_ZUNPOS_REQUEST,
  FAMILY_LIST_FROM_ZUNPOS_SUCCESS,
  FAMILY_LIST_FROM_ZUNPOS_ERROR,
  FAMILY_LIST_FROM_ZUNPOS_RESET,
  FAMILY_LIST_UPDATE_FROM_ZUNPOS_REQUEST,
  FAMILY_LIST_UPDATE_FROM_ZUNPOS_SUCCESS,
  FAMILY_LIST_UPDATE_FROM_ZUNPOS_ERROR,
  FAMILY_LIST_UPDATE_FROM_ZUNPOS_RESET,
  FAMILY_DELETE_REQUEST,
  FAMILY_DELETE_SUCCESS,
  FAMILY_DELETE_ERROR,
  FAMILY_DELETE_RESET,
  FAMILY_SINCRONIZE_REQUEST,
  FAMILY_SINCRONIZE_SUCCESS,
  FAMILY_SINCRONIZE_ERROR,
  FAMILY_SINCRONIZE_RESET,
} from "src/redux/constants/familyConstants";

export const familyListReducer = (state = { families: [] }, action) => {
  switch (action.type) {
    case FAMILY_LIST_REQUEST:
      return { loading: true };

    case FAMILY_LIST_SUCCESS:
      return { loading: false, families: action.payload };

    case FAMILY_LIST_ERROR:
      return { loading: false, error: action.payload };

    case FAMILY_LIST_RESET:
      return {};

    default:
      return state;
  }
};

export const familyListFromZunPosReducer = (
  state = { families: [] },
  action
) => {
  switch (action.type) {
    case FAMILY_LIST_FROM_ZUNPOS_REQUEST:
      return { loading: true };

    case FAMILY_LIST_FROM_ZUNPOS_SUCCESS:
      return { loading: false, families: action.payload };

    case FAMILY_LIST_FROM_ZUNPOS_ERROR:
      return { loading: false, error: action.payload };

    case FAMILY_LIST_FROM_ZUNPOS_RESET:
      return {};

    default:
      return state;
  }
};

export const updatefamilyListFromZunPosReducer = (state = {}, action) => {
  switch (action.type) {
    case FAMILY_LIST_UPDATE_FROM_ZUNPOS_REQUEST:
      return { loading: true };

    case FAMILY_LIST_UPDATE_FROM_ZUNPOS_SUCCESS:
      return { loading: false, success: true };

    case FAMILY_LIST_UPDATE_FROM_ZUNPOS_ERROR:
      return { loading: false, error: action.payload };

    case FAMILY_LIST_UPDATE_FROM_ZUNPOS_RESET:
      return {};

    default:
      return state;
  }
};

export const deletefamilyReducer = (state = {}, action) => {
  switch (action.type) {
    case FAMILY_DELETE_REQUEST:
      return { loading: true };

    case FAMILY_DELETE_SUCCESS:
      return { loading: false, success: true };

    case FAMILY_DELETE_ERROR:
      return { loading: false, error: action.payload };

    case FAMILY_DELETE_RESET:
      return {};

    default:
      return state;
  }
};

export const sincronizefamilyReducer = (state = {}, action) => {
  switch (action.type) {
    case FAMILY_SINCRONIZE_REQUEST:
      return { loading: true };

    case FAMILY_SINCRONIZE_SUCCESS:
      return { loading: false, success: true };

    case FAMILY_SINCRONIZE_ERROR:
      return { loading: false, error: action.payload };

    case FAMILY_SINCRONIZE_RESET:
      return {};

    default:
      return state;
  }
};
