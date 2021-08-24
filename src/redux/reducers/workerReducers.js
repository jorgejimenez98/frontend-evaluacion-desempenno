import {
  SET_OPERATOR_REQUEST,
  SET_OPERATOR_SUCCESS,
  SET_OPERATOR_ERROR,
  SET_OPERATOR_RESET,
  OPERATOR_LIST_REQUEST,
  OPERATOR_LIST_SUCCESS,
  OPERATOR_LIST_ERROR,
  OPERATOR_LIST_RESET,
  OPERATOR_DELETE_REQUEST,
  OPERATOR_DELETE_SUCCESS,
  OPERATOR_DELETE_ERROR,
  OPERATOR_DELETE_RESET,
  WORKER_LIST_REQUEST,
  WORKER_LIST_SUCCESS,
  WORKER_LIST_ERROR,
  WORKER_LIST_RESET,
  WORKER_DELETE_REQUEST,
  WORKER_DELETE_SUCCESS,
  WORKER_DELETE_ERROR,
  WORKER_DELETE_RESET,
  WORKER_LIST_FROM_ZUNPR_REQUEST,
  WORKER_LIST_FROM_ZUNPR_SUCCESS,
  WORKER_LIST_FROM_ZUNPR_ERROR,
  WORKER_LIST_FROM_ZUNPR_RESET,
  WORKER_IMPORT_FROM_ZUNPR_REQUEST,
  WORKER_IMPORT_FROM_ZUNPR_SUCCESS,
  WORKER_IMPORT_FROM_ZUNPR_ERROR,
  WORKER_IMPORT_FROM_ZUNPR_RESET,
  WORKER_SINCRO_REQUEST,
  WORKER_SINCRO_SUCCESS,
  WORKER_SINCRO_ERROR,
  WORKER_SINCRO_RESET,
  WORKER_REBUILD_REQUEST,
  WORKER_REBUILD_SUCCESS,
  WORKER_REBUILD_ERROR,
  WORKER_REBUILD_RESET,
  WORKER_DETAILS_REQUEST,
  WORKER_DETAILS_SUCCESS,
  WORKER_DETAILS_ERROR,
  WORKER_DETAILS_RESET,
  WORKER_EVALUATOR_DETAILS_REQUEST,
  WORKER_EVALUATOR_DETAILS_SUCCESS,
  WORKER_EVALUATOR_DETAILS_ERROR,
  WORKER_EVALUATOR_DETAILS_RESET,
} from "../constants/workerConstants";

export const operatorListReducer = (state = { operators: [] }, action) => {
  switch (action.type) {
    case OPERATOR_LIST_REQUEST:
      return { loading: true };

    case OPERATOR_LIST_SUCCESS:
      return { loading: false, operators: action.payload };

    case OPERATOR_LIST_ERROR:
      return { loading: false, error: action.payload };

    case OPERATOR_LIST_RESET:
      return {};

    default:
      return state;
  }
};

export const setOperatorReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_OPERATOR_REQUEST:
      return { loading: true };

    case SET_OPERATOR_SUCCESS:
      return { loading: false, success: true };

    case SET_OPERATOR_ERROR:
      return { loading: false, error: action.payload };

    case SET_OPERATOR_RESET:
      return {};

    default:
      return state;
  }
};

export const deleteOperatorReducer = (state = {}, action) => {
  switch (action.type) {
    case OPERATOR_DELETE_REQUEST:
      return { loading: true };

    case OPERATOR_DELETE_SUCCESS:
      return { loading: false, success: true };

    case OPERATOR_DELETE_ERROR:
      return { loading: false, error: action.payload };

    case OPERATOR_DELETE_RESET:
      return {};

    default:
      return state;
  }
};

export const workerListReducer = (state = { workers: [] }, action) => {
  switch (action.type) {
    case WORKER_LIST_REQUEST:
      return { loading: true };

    case WORKER_LIST_SUCCESS:
      return { loading: false, workers: action.payload };

    case WORKER_LIST_ERROR:
      return { loading: false, error: action.payload };

    case WORKER_LIST_RESET:
      return {};

    default:
      return state;
  }
};

export const workerLisFromZunPRtReducer = (state = { workers: [] }, action) => {
  switch (action.type) {
    case WORKER_LIST_FROM_ZUNPR_REQUEST:
      return { loading: true };

    case WORKER_LIST_FROM_ZUNPR_SUCCESS:
      return { loading: false, workers: action.payload };

    case WORKER_LIST_FROM_ZUNPR_ERROR:
      return { loading: false, error: action.payload };

    case WORKER_LIST_FROM_ZUNPR_RESET:
      return {};

    default:
      return state;
  }
};

export const importWorkersReducer = (state = {}, action) => {
  switch (action.type) {
    case WORKER_IMPORT_FROM_ZUNPR_REQUEST:
      return { loading: true };

    case WORKER_IMPORT_FROM_ZUNPR_SUCCESS:
      return { loading: false, success: true };

    case WORKER_IMPORT_FROM_ZUNPR_ERROR:
      return { loading: false, error: action.payload };

    case WORKER_IMPORT_FROM_ZUNPR_RESET:
      return {};

    default:
      return state;
  }
};

export const deleteWorkersReducer = (state = {}, action) => {
  switch (action.type) {
    case WORKER_DELETE_REQUEST:
      return { loading: true };

    case WORKER_DELETE_SUCCESS:
      return { loading: false, success: true };

    case WORKER_DELETE_ERROR:
      return { loading: false, error: action.payload };

    case WORKER_DELETE_RESET:
      return {};

    default:
      return state;
  }
};

export const workerSincroReducer = (state = { workers: [] }, action) => {
  switch (action.type) {
    case WORKER_SINCRO_REQUEST:
      return { loading: true };

    case WORKER_SINCRO_SUCCESS:
      return { loading: false, workers: action.payload, success: true };

    case WORKER_SINCRO_ERROR:
      return { loading: false, error: action.payload };

    case WORKER_SINCRO_RESET:
      return {};

    default:
      return state;
  }
};

export const rebuildWorkersReducer = (state = {}, action) => {
  switch (action.type) {
    case WORKER_REBUILD_REQUEST:
      return { loading: true };

    case WORKER_REBUILD_SUCCESS:
      return { loading: false, success: true };

    case WORKER_REBUILD_ERROR:
      return { loading: false, error: action.payload };

    case WORKER_REBUILD_RESET:
      return {};

    default:
      return state;
  }
};

export const workerDetailstReducer = (state = { worker: {} }, action) => {
  switch (action.type) {
    case WORKER_DETAILS_REQUEST:
      return { loading: true };

    case WORKER_DETAILS_SUCCESS:
      return { loading: false, worker: action.payload };

    case WORKER_DETAILS_ERROR:
      return { loading: false, error: action.payload };

    case WORKER_DETAILS_RESET:
      return {};

    default:
      return state;
  }
};

export const evaluatorDetailstReducer = (state = { evaluator: {} }, action) => {
  switch (action.type) {
    case WORKER_EVALUATOR_DETAILS_REQUEST:
      return { loading: true };

    case WORKER_EVALUATOR_DETAILS_SUCCESS:
      return { loading: false, evaluator: action.payload };

    case WORKER_EVALUATOR_DETAILS_ERROR:
      return { loading: false, error: action.payload };

    case WORKER_EVALUATOR_DETAILS_RESET:
      return {};

    default:
      return state;
  }
};
