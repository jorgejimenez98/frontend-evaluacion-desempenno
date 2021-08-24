import {
  HOTEL_LIST_REQUEST,
  HOTEL_LIST_SUCCESS,
  HOTEL_LIST_FAIL,
  HOTEL_LIST_RESET,
  HOTEL_ADD_REQUEST,
  HOTEL_ADD_SUCCESS,
  HOTEL_ADD_FAIL,
  HOTEL_ADD_RESET,
  HOTEL_DELETE_REQUEST,
  HOTEL_DELETE_SUCCESS,
  HOTEL_DELETE_FAIL,
  HOTEL_DELETE_RESET,
  HOTEL_DETAILS_REQUEST,
  HOTEL_DETAILS_SUCCESS,
  HOTEL_DETAILS_FAIL,
  HOTEL_DETAILS_RESET,
  HOTEL_EDIT_REQUEST,
  HOTEL_EDIT_SUCCESS,
  HOTEL_EDIT_FAIL,
  HOTEL_EDIT_RESET,
} from "../constants/hotelConstants";

export const hotelListReducer = (state = { hotels: [] }, action) => {
  switch (action.type) {
    case HOTEL_LIST_REQUEST:
      return { loading: true };

    case HOTEL_LIST_SUCCESS:
      return { loading: false, hotels: action.payload };

    case HOTEL_LIST_FAIL:
      return { loading: false, error: action.payload };

    case HOTEL_LIST_RESET:
      return {};

    default:
      return state;
  }
};

export const addHotelReducer = (state = {}, action) => {
  switch (action.type) {
    case HOTEL_ADD_REQUEST:
      return { loading: true };

    case HOTEL_ADD_SUCCESS:
      return { loading: false, success: true };

    case HOTEL_ADD_FAIL:
      return { loading: false, error: action.payload };

    case HOTEL_ADD_RESET:
      return {};

    default:
      return state;
  }
};

export const deleteHotelsReducer = (state = {}, action) => {
  switch (action.type) {
    case HOTEL_DELETE_REQUEST:
      return { loading: true };

    case HOTEL_DELETE_SUCCESS:
      return { loading: false, success: true };

    case HOTEL_DELETE_FAIL:
      return { loading: false, error: action.payload };

    case HOTEL_DELETE_RESET:
      return {};

    default:
      return state;
  }
};

export const hotelDetailsReducers = (state = { hotel: {} }, action) => {
  switch (action.type) {
    case HOTEL_DETAILS_REQUEST:
      return { ...state, loading: true };

    case HOTEL_DETAILS_SUCCESS:
      return { loading: false, hotel: action.payload };

    case HOTEL_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    case HOTEL_DETAILS_RESET:
      return { user: {} };

    default:
      return state;
  }
};

export const editHotelReducer = (state = {}, action) => {
  switch (action.type) {
    case HOTEL_EDIT_REQUEST:
      return { loading: true };

    case HOTEL_EDIT_SUCCESS:
      return { loading: false, success: true };

    case HOTEL_EDIT_FAIL:
      return { loading: false, error: action.payload };

    case HOTEL_EDIT_RESET:
      return {};

    default:
      return state;
  }
};
