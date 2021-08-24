import {
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_ERROR,
  CATEGORY_LIST_RESET,
  CATEGORY_SINCRO_REQUEST,
  CATEGORY_SINCRO_SUCCESS,
  CATEGORY_SINCRO_ERROR,
  CATEGORY_SINCRO_RESET,
  CATEGORY_REBUILD_LIST_REQUEST,
  CATEGORY_REBUILD_LIST_SUCCESS,
  CATEGORY_REBUILD_LIST_ERROR,
  CATEGORY_REBUILD_LIST_RESET,
} from "../constants/categoryConstants";

export const categoryListReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case CATEGORY_LIST_REQUEST:
      return { loading: true };

    case CATEGORY_LIST_SUCCESS:
      return { loading: false, categories: action.payload };

    case CATEGORY_LIST_ERROR:
      return { loading: false, error: action.payload };

    case CATEGORY_LIST_RESET:
      return {};

    default:
      return state;
  }
};

export const sincroCategoryListReducer = (
  state = { categories: [] },
  action
) => {
  switch (action.type) {
    case CATEGORY_SINCRO_REQUEST:
      return { loading: true };

    case CATEGORY_SINCRO_SUCCESS:
      return { loading: false, categories: action.payload, success: true };

    case CATEGORY_SINCRO_ERROR:
      return { loading: false, error: action.payload };

    case CATEGORY_SINCRO_RESET:
      return {};

    default:
      return state;
  }
};

export const rebuildListCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_REBUILD_LIST_REQUEST:
      return { loading: true };

    case CATEGORY_REBUILD_LIST_SUCCESS:
      return { loading: false, success: true };

    case CATEGORY_REBUILD_LIST_ERROR:
      return { loading: false, error: action.payload };

    case CATEGORY_REBUILD_LIST_RESET:
      return {};

    default:
      return state;
  }
};
